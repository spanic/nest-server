import { Module } from '@nestjs/common';
import { DevicesDataController } from './devices-data.controller';
import { DevicesDataService } from './devices-data.service';

@Module({
  controllers: [DevicesDataController],
  providers: [DevicesDataService],
})
export class DevicesModule {}
