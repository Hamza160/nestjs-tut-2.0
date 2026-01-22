import {createParamDecorator, SetMetadata} from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx) => {
        const request = ctx.switchToHttp().getRequest();

        return request.user;
    }
);
