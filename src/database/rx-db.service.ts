import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { addRxPlugin } from 'rxdb';
import { EnvironmentVariables } from 'src/shared/models/environment-variables.model';
import { NodeEnvironment } from 'src/shared/models/node-environment.enum';
import { ShoppingDbProvider } from './shopping/shopping-db.provider';
import { DevicesDbProvider } from './devices/devices-db.provider';

@Injectable()
export class RxDbService implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    readonly shoppingDb: ShoppingDbProvider,
    readonly devicesDb: DevicesDbProvider,
  ) {}

  async onApplicationBootstrap() {
    const nodeEnv = this.configService.get('env', { infer: true });
    if (nodeEnv !== NodeEnvironment.Production) {
      await import('rxdb/plugins/dev-mode').then(({ RxDBDevModePlugin }) =>
        addRxPlugin(RxDBDevModePlugin),
      );
    }
  }
}
