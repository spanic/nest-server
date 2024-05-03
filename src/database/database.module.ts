import { Global, Module } from '@nestjs/common';
import { RxDBService } from './rxdb.service';

@Global()
@Module({
  providers: [RxDBService],
  exports: [RxDBService],
})
export class DatabaseModule {}
