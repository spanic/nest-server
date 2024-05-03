import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export enum SWAGGER_TAGS {
  Devices = 'Devices & statuses',
  Auth = 'Authentication',
}

export const SWAGGER_TAGS_DEF: {
  [key in keyof typeof SWAGGER_TAGS]?: { name: string; description?: string };
} = {
  Devices: {
    name: SWAGGER_TAGS.Devices,
    description: 'Requires authorization ⚠️',
  },
  Auth: {
    name: SWAGGER_TAGS.Auth,
  },
};

export class SwaggerDocumentBuilder {
  private static readonly SWAGGER_URL = process.env.SWAGGER_API_URL;

  constructor(private readonly app: INestApplication) {}

  private buildConfig() {
    const config = new DocumentBuilder()
      .setTitle('Data server')
      .setDescription('### Use Bearer token for authorization ⬇')
      .setVersion('1.0')
      .addBearerAuth()
      .addCookieAuth('access_token', {
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
      SwaggerDocumentBuilder.SWAGGER_URL,
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
