import { ConfigFactory } from '@nestjs/config';
import { EnvironmentVariables } from './shared/models/environment-variables.model';

const configurationFactory: ConfigFactory<EnvironmentVariables> = () => ({
  jwtTokenSecret: process.env.JWT_TOKEN_SECRET,
  jwtTokenLifetimeMs: parseInt(process.env.JWT_TOKEN_LIFETIME_MS),
  swaggerApiUrl: process.env.SWAGGER_API_URL,
  port: parseInt(process.env.PORT),
  defaultUserId: process.env.DEFAULT_USER_ID,
});

export default configurationFactory;
