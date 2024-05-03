export interface EnvironmentVariables {
  jwtTokenSecret: string;
  jwtTokenLifetimeMs: number;
  swaggerApiUrl: string;
  port: number;
  defaultUserId: string;
}
