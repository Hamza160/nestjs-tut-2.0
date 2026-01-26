import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from './entities/user.entity'
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {RolesGuard} from "./guards/roles.guard";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        // passport module
        PassportModule,
        // Configure JWT
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RolesGuard], // jwt strategy, roles guard
    exports: [AuthService, RolesGuard], // roles guard -> todo
})
export class AuthModule {
}
