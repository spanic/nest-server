import { Global, Module } from '@nestjs/common';
import { RxDbService } from './rx-db.service';
import { ShoppingDbProvider } from './shopping/shopping-db.provider';
import { DevicesDbProvider } from './devices/devices-db.provider';

@Global()
@Module({
  providers: [RxDbService, ShoppingDbProvider, DevicesDbProvider],
  exports: [RxDbService],
})
export class DatabaseModule {}
