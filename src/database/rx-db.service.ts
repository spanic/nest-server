import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { addRxPlugin } from 'rxdb';
import { NodeEnvironment } from 'src/shared/models/node-environment.enum';
import { ShoppingDbProvider } from './shopping/shopping-db.provider';
import { DevicesDbProvider } from './devices/devices-db.provider';

@Injectable()
export class RxDbService implements OnApplicationBootstrap {
  constructor(
    @Inject('NODE_ENV') private readonly nodeEnv: NodeEnvironment,
    readonly shoppingDb: ShoppingDbProvider,
    readonly devicesDb: DevicesDbProvider,
  ) {}

  async onApplicationBootstrap() {
    if (this.nodeEnv !== NodeEnvironment.Production) {
      await import('rxdb/plugins/dev-mode').then(({ RxDBDevModePlugin }) =>
        addRxPlugin(RxDBDevModePlugin),
      );
    }
  }
}
