import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from './entities/user.entity'
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        // passport module
        PassportModule,
        // Configure JWT
        JwtModule.register({})
    ],
    controllers: [AuthController],
    providers: [AuthService], // jwt strategy, roles guard
    exports: [AuthService], // roles guard -> todo
})
export class AuthModule {
}
