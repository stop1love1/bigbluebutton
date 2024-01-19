import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RequestMethod, VersioningType } from '@nestjs/common/enums';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
import { AppModule } from './app.module';

console.log(`✅ BBB API is running on: ${process.env.BASE_URL} ✌️\n`);

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
        origin: process.env.CORS_SETTING.split(','),
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
        preflightContinue: false,
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api', {
        exclude: [{ path: '/', method: RequestMethod.GET }],
    });
    app.enableVersioning({
        type: VersioningType.URI,
    });
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        const config = new DocumentBuilder().build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document, {
            customCss: '.swagger-ui section.models, .errors-wrapper { display: none;}',
        });
        app.use('/docs', express.static(path.join(__dirname, '../node_modules/swagger-ui/dist')));
    }
    const port = process.env.PORT || 3000;

    await app.listen(port);
}

bootstrap();
