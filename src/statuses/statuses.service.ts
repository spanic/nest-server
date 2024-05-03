import { Injectable } from '@nestjs/common';
import { RxDBService } from 'src/database/rxdb.service';
import { Status } from 'src/shared/models/device-data.model';
import { StatusesData } from 'src/shared/models/statuses-data.model';

@Injectable()
export class StatusesService {
  constructor(private rxDbService: RxDBService) {}

  async findAll(): Promise<StatusesData> {
    const enumKeys = Object.keys(Status);

    const devices = await this.rxDbService.devicesCollection.find().exec();

    const randomizedStatusesData = devices.reduce((acc, deviceData) => {
      const randomEnumKey =
        enumKeys[Math.floor(Math.random() * enumKeys.length)];
      acc[deviceData.id] = Status[randomEnumKey];
      return acc;
    }, {} as StatusesData);

    return randomizedStatusesData;
  }
}
