export interface EnvironmentVariables {
  jwtTokenSecret: string;
  jwtTokenLifetimeMs: number;
  swaggerApiUrl: string;
  defaultPrefix: string;
  port: number;
  defaultUserId: string;
}
