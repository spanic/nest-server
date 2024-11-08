import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RxDbService } from 'src/database/rx-db.service';
import { DevicesDataController } from './devices-data.controller';
import { DevicesDataService } from './devices-data.service';

describe('DevicesDataController', () => {
  let devicesDataController: DevicesDataController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DevicesDataController],
      providers: [DevicesDataService, RxDbService, ConfigService],
    }).compile();

    devicesDataController = app.get<DevicesDataController>(
      DevicesDataController,
    );
  });

  it('should be defined', () => {
    expect(devicesDataController).toBeDefined();
  });
});
