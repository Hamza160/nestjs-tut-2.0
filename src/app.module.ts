import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PostsModule} from './posts/posts.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "./posts/entities/post.entity";
import {AuthModule} from './auth/auth.module';
import {User} from "./auth/entities/user.entity"

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'Godisgreat@134',
            database: 'nestjs',
            entities: [Post, User],
            synchronize: true, // dev mode
        }),
        PostsModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
}
