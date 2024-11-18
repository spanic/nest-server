import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './models/environment-variables.model';

export const NodeEnvProvider = {
  provide: 'NODE_ENV',
  useFactory: (configService: ConfigService<EnvironmentVariables>) => {
    return configService.get('env', { infer: true });
  },
  inject: [ConfigService],
};
