import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './shared/models/environment-variables.model';
import { SwaggerDocumentBuilder } from './swagger/swagger-document-builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService<EnvironmentVariables>);

  app
    .enableShutdownHooks()
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    .use(cookieParser())
    .setGlobalPrefix(configService.get('defaultPrefix'));

  new SwaggerDocumentBuilder(app).build();

  await app.listen(configService.get('port'));
}

bootstrap();
