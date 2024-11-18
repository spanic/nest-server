import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { createRxDatabase, RxCollection, RxDatabase } from 'rxdb';
import { OfferData } from '../../shared/models/offer-data.model';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { faker } from '@faker-js/faker';

@Injectable()
export class ShoppingDbProvider
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private static readonly SHOPPING_DB_NAME = 'shopping_db';
  private static readonly OFFERS_COLLECTION_NAME = 'offers_collection';
  private static readonly OFFERS_COLLECTION_SCHEMA = {
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
      description: {
        type: 'string',
      },
      price: {
        type: 'number',
        multipleOf: 0.01,
      },
    },
    required: ['id', 'name', 'price'],
  };

  shoppingDb: RxDatabase<{
    [ShoppingDbProvider.SHOPPING_DB_NAME]: ShoppingDbProvider['offersCollection'];
  }>;

  offersCollection: RxCollection<OfferData>;

  async onApplicationBootstrap() {
    this.shoppingDb = await createRxDatabase({
      name: ShoppingDbProvider.SHOPPING_DB_NAME,
      storage: getRxStorageMemory(),
    });

    await this.shoppingDb.addCollections({
      [ShoppingDbProvider.OFFERS_COLLECTION_NAME]: {
        schema: ShoppingDbProvider.OFFERS_COLLECTION_SCHEMA,
      },
    });

    this.offersCollection =
      this.shoppingDb[ShoppingDbProvider.OFFERS_COLLECTION_NAME];

    await this.offersCollection.bulkInsert(
      ShoppingDbProvider.generateInitialData(),
    );
  }

  onApplicationShutdown() {
    this.shoppingDb.destroy();
  }

  private static generateInitialData() {
    return faker.helpers.multiple(
      (): OfferData => {
        return {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: Number(faker.commerce.price({ max: 10 })),
        };
      },
      { count: { min: 5, max: 10 } },
    );
  }
}
