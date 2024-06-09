import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RxCollection, RxDatabase, addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { EnvironmentVariables } from 'src/shared/models/environment-variables.model';
import { NodeEnvironment } from 'src/shared/models/node-environment.enum';
import { v4 as uuidv4 } from 'uuid';
import { devicesData } from '../data/devices-data';
import {
  DeviceData,
  deviceDataRxDbJsonSchema as schema,
} from '../shared/models/device-data.model';

@Injectable()
export class RxDBService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private static readonly DEVICES_DB_NAME = 'devices_db';
  private static readonly DEVICES_COLLECTION_NAME = 'devices_collection';

  devicesDb: RxDatabase<{
    [RxDBService.DEVICES_COLLECTION_NAME]: RxDBService['devicesCollection'];
  }>;

  devicesCollection: RxCollection<DeviceData>;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async onApplicationBootstrap() {
    const nodeEnv = this.configService.get('env', { infer: true });
    if (nodeEnv !== NodeEnvironment.Production) {
      await import('rxdb/plugins/dev-mode').then(({ RxDBDevModePlugin }) =>
        addRxPlugin(RxDBDevModePlugin),
      );
    }

    this.devicesDb = await createRxDatabase({
      name: RxDBService.DEVICES_DB_NAME,
      storage: getRxStorageMemory(),
    });

    await this.devicesDb.addCollections({
      devices_collection: {
        schema,
      },
    });

    this.devicesCollection =
      this.devicesDb[RxDBService.DEVICES_COLLECTION_NAME];

    await this.devicesCollection.bulkInsert(
      devicesData.map((device) => {
        return { ...device, id: uuidv4() };
      }),
    );
  }

  async onApplicationShutdown() {
    await this.devicesDb.destroy();
  }
}
