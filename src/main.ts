import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SwaggerDocumentBuilder } from './swagger/swagger-document-builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app
    .enableShutdownHooks()
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    .use(cookieParser())
    .setGlobalPrefix(process.env.DEFAULT_PREFIX);

  new SwaggerDocumentBuilder(app).build();

  await app.listen(process.env.PORT);
}

bootstrap();
