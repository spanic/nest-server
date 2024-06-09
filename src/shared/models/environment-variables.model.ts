import { NodeEnvironment } from './node-environment.enum';

export interface EnvironmentVariables {
  env: NodeEnvironment;
  jwtTokenSecret: string;
  jwtTokenLifetimeMs: number;
  swaggerApiUrl: string;
  defaultPrefix?: string;
  port: number;
  defaultUserId: string;
}
