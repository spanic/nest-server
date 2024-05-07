import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AUTH_COOKIE_NAME } from 'src/shared/constants';
import { EnvironmentVariables } from 'src/shared/models/environment-variables.model';
import { SWAGGER_TAGS_DEF } from './swagger-tags';

export class SwaggerDocumentBuilder {
  private readonly configService = this.app.get(
    ConfigService<EnvironmentVariables>,
  );

  constructor(private readonly app: INestApplication) {}

  private buildConfig() {
    const config = new DocumentBuilder()
      .setTitle('Data server')
      .setDescription('### Use Bearer token for authorization ⬇')
      .setVersion('1.0')
      .addBearerAuth()
      .addCookieAuth(AUTH_COOKIE_NAME, {
        type: 'http',
        scheme: 'Bearer',
        in: 'Header',
      });

    Object.values(SWAGGER_TAGS_DEF).forEach(({ name, description }) =>
      config.addTag(name, description),
    );

    return config.build();
  }

  build() {
    const config = this.buildConfig();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup(
      this.configService.get('swaggerApiUrl'),
      this.app,
      document,
      {
        customCss: `
        .swagger-ui .information-container .info .description .renderedMarkdown {
          text-align: end;
        }
        .swagger-ui .parameters-container .parameters-col_description .parameter__enum,
        .swagger-ui .parameters-container .parameters-col_description .parameter__default {
          color: gray;
          font-family: monospace;
          font-size: 12px;
          font-style: italic;
          font-weight: 600;
        }`,
      },
    );
  }
}
