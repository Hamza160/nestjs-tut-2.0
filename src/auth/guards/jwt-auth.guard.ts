import {CanActivate, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

// protects routes that required authentication

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
}