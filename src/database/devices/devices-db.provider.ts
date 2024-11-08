import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { createRxDatabase, RxCollection, RxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { DeviceData, Status } from '../../shared/models/device-data.model';
import { faker } from '@faker-js/faker';

@Injectable()
export class DevicesDbProvider
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private static readonly DEVICES_DB_NAME = 'devices_db';
  private static readonly DEVICES_COLLECTION_NAME = 'devices_collection';

  devicesDb: RxDatabase<{
    [DevicesDbProvider.DEVICES_COLLECTION_NAME]: DevicesDbProvider['devicesCollection'];
  }>;

  devicesCollection: RxCollection<DeviceData>;

  async onApplicationBootstrap() {
    this.devicesDb = await createRxDatabase({
      name: DevicesDbProvider.DEVICES_DB_NAME,
      storage: getRxStorageMemory(),
    });

    const schema = {
      version: 0,
      primaryKey: 'id',
      type: 'object',
      properties: {
        id: {
          type: 'string',
          maxLength: 100,
          format: 'uuid',
        },
        name: {
          type: 'string',
        },
        manufacturer: {
          type: 'string',
        },
        model: {
          type: 'string',
        },
        uptime: {
          type: 'integer',
          minimum: 0,
        },
        firmwareVersion: {
          type: 'string',
        },
        macAddress: {
          type: 'string',
        },
        ipAddress: {
          type: 'string',
          format: 'ipv4',
        },
        location: {
          type: 'string',
        },
        status: {
          type: 'string',
          enum: [
            Status.Offline,
            Status.Operational,
            Status.Warning,
            Status.Error,
            Status.Unknown,
          ],
        },
      },
      required: ['id', 'name'],
    };

    await this.devicesDb.addCollections({
      devices_collection: {
        schema,
      },
    });

    this.devicesCollection =
      this.devicesDb[DevicesDbProvider.DEVICES_COLLECTION_NAME];

    await this.devicesCollection.bulkInsert(this.generateInitialData());
  }

  private generateInitialData() {
    const availableDeviceTypes = [
      'router',
      'switch',
      'firewall',
      'gateway',
      'WAP',
    ];
    const availableManufacturers = [
      'Cisco',
      'NEC',
      'Juniper',
      'Fortinet',
      'Huawei',
      'Ericsson',
      'Nokia',
    ];

    return faker.helpers.multiple(
      (): DeviceData => {
        const sex = faker.person.sexType();
        const prefix = faker.person.prefix(sex);
        const lastName = faker.person.lastName(sex);

        return {
          id: faker.string.uuid(),
          name: faker.helpers.mustache("{{prefix}} {{lastName}}'s {{device}}", {
            prefix,
            lastName,
            device: faker.helpers.arrayElement(availableDeviceTypes),
          }),
          manufacturer: faker.helpers.arrayElement(availableManufacturers),
          model: faker.helpers.fromRegExp(/[A-Z]{2,3}-[0-9]{3,5}/),
          firmwareVersion: faker.system.semver(),
          macAddress: faker.internet.mac(),
          ipAddress: faker.internet.ipv4(),
          location: faker.location.streetAddress(),
        };
      },
      { count: { min: 10, max: 20 } },
    );
  }

  async onApplicationShutdown() {
    await this.devicesDb.destroy();
  }
}
