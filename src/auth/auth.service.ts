import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import {User, UserRole} from "./entities/user.entity"
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RegisterDto} from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./dto/login.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.userRepository.findOne({
            where: {
                email: registerDto.email
            }
        })

        if (existingUser) {
            throw new ConflictException('Email already in use please try a different email')
        }

        const hashedPassword = await this.hashPassword(registerDto.password)

        const newlyCreatedUser = this.userRepository.create({
            email: registerDto.email,
            name: registerDto.name,
            password: hashedPassword,
            role: UserRole.USER,
        })

        const savedUser = await this.userRepository.save(newlyCreatedUser)

        const {password, ...result} = savedUser

        return {
            user: result,
            message: 'Registration successful! Please login to continue',
        }
    }

    async createAdmin(registerDto: RegisterDto) {
        const existingUser = await this.userRepository.findOne({
            where: {
                email: registerDto.email
            }
        })

        if (existingUser) {
            throw new ConflictException('Email already in use please try a different email')
        }

        const hashedPassword = await this.hashPassword(registerDto.password)

        const newlyCreatedUser = this.userRepository.create({
            email: registerDto.email,
            name: registerDto.name,
            password: hashedPassword,
            role: UserRole.ADMIN,
        })

        const savedUser = await this.userRepository.save(newlyCreatedUser)

        const {password, ...result} = savedUser

        return {
            user: result,
            message: 'Admin user created successful! Please login to continue',
        }
    }

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({
            where: {
                email: loginDto.email
            }
        })

        if (!user || !(await this.verifyPassword(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid email or password')
        }

        // generate the tokens
        const tokens = this.generateTokens(user)
        const {password, ...result} = user;

        return {
            user: result,
            ...tokens
        }

    }

    // Find the current user by ID
    async getUserById(userId: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        const {password, ...result} = user
        return result
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: "JWT_SECRET_REFRESH_KEY"
            })

            const user = await this.userRepository.findOne({
                where: {
                    id: payload.sub
                }
            })

            if (!user) {
                throw new UnauthorizedException('Invalid token')
            }

            const accessToken = this.generateRefreshToken(user)

            return {
                accessToken,
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid token')
        }
    }

    private async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }

    private generateTokens(user: User) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user)
        }
    }

    private generateAccessToken(user: User): string {
        // -> email, sub (id), role -> vvvI -> RBCA
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role
        }

        return this.jwtService.sign(payload, {
            secret: "JWT_SECRET_KEY",
            expiresIn: '15m'
        });

    }

    private generateRefreshToken(user: User): string {
        const payload = {
            sub: user.id,
        }

        return this.jwtService.sign(payload, {
            secret: "JWT_SECRET_REFRESH_KEY",
            expiresIn: '7d'
        });
    }
}
