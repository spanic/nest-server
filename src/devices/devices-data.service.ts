import { Injectable } from '@nestjs/common';
import { DeviceData } from 'src/shared/models/device-data.model';
import { RxDbService } from 'src/database/rx-db.service';

@Injectable()
export class DevicesDataService {
  constructor(private rxDbService: RxDbService) {}

  async getDevicesData(): Promise<DeviceData[]> {
    return await this.rxDbService.devicesDb.devicesCollection
      .find()
      .exec()
      .then((results) => results.map((document) => document.toJSON()));
  }
}
