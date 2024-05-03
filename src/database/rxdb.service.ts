import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { RxCollection, RxDatabase, addRxPlugin, createRxDatabase } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
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

  async onApplicationBootstrap() {
    addRxPlugin(RxDBDevModePlugin);

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
