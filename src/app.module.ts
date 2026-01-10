import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import Joi, * as joi from "joi";
import AppConfig from "./config/app.config";
@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          // validationSchema: joi.object({
          //     APP_NAME: Joi.string().default('DefaultApp'),
          // }),
          load: [AppConfig],
      }),
      HelloModule,
      UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
