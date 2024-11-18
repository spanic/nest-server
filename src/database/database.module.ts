import { Global, Module } from '@nestjs/common';
import { RxDbService } from './rx-db.service';
import { ShoppingDbProvider } from './shopping/shopping-db.provider';
import { DevicesDbProvider } from './devices/devices-db.provider';
import { NodeEnvProvider } from '../shared/node-env.provider';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    RxDbService,
    ShoppingDbProvider,
    DevicesDbProvider,
    ConfigService,
    NodeEnvProvider,
  ],
  exports: [RxDbService],
})
export class DatabaseModule {}
