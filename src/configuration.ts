import { ConfigFactory, ConfigModule } from '@nestjs/config';
import { EnvironmentVariables } from './shared/models/environment-variables.model';
import { NodeEnvironment } from './shared/models/node-environment.enum';
import { DynamicModule } from '@nestjs/common';

const configurationFactory: ConfigFactory<EnvironmentVariables> = () => ({
  env: process.env.NODE_ENV as NodeEnvironment,
  jwtTokenSecret: process.env.JWT_TOKEN_SECRET,
  jwtTokenLifetimeMs: parseInt(process.env.JWT_TOKEN_LIFETIME_MS),
  swaggerApiUrl: process.env.SWAGGER_API_URL,
  defaultPrefix: process.env.DEFAULT_PREFIX,
  port: parseInt(process.env.PORT),
  defaultUserId: process.env.DEFAULT_USER_ID,
});

const ConfigurationModule: DynamicModule = ConfigModule.forRoot({
  envFilePath: ['.env', '.env.development'],
  load: [configurationFactory],
  isGlobal: true,
  expandVariables: true,
});

export { ConfigurationModule };
