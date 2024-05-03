import { Injectable } from '@nestjs/common';
import { DeviceData } from 'src/shared/models/device-data.model';
import { RxDBService } from 'src/database/rxdb.service';

@Injectable()
export class DevicesDataService {
  constructor(private rxDbService: RxDBService) {}

  async getDevicesData(): Promise<DeviceData[]> {
    return await this.rxDbService.devicesCollection.find().exec();
  }
}
