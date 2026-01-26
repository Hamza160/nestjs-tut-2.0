import {Module} from '@nestjs/common';
import {PostsController} from './posts.controller';
import {PostsService} from './posts.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "./entities/post.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]), // Post entity will be available in the current scope
        AuthModule
    ],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule {
}
