import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {AuthService} from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'JWT_SECRET_KEY'
        });
    }

    async validate(payload: any) {
        try {
            const user = this.authService.getUserById(Number(payload.user_id));
            return {
                ...user,
                role: payload.role
            }
        } catch (error) {
            throw new UnauthorizedException('Invalid Token');
        }
    }

}