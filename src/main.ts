import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //global settings
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // strips properties that don't have decorators
        forbidNonWhitelisted: true,
        transform: true, // automatically transforms payloads to be object typed according to their DTO classes
        disableErrorMessages: false,
    }));
    //env
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
