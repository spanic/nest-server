import { Test, TestingModule } from '@nestjs/testing';
import { RxDBService } from 'src/database/rxdb.service';
import { DevicesDataController } from './devices-data.controller';
import { DevicesDataService } from './devices-data.service';

describe('DevicesDataController', () => {
  let devicesDataController: DevicesDataController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DevicesDataController],
      providers: [DevicesDataService, RxDBService],
    }).compile();

    devicesDataController = app.get<DevicesDataController>(
      DevicesDataController,
    );
  });

  it('should be defined', () => {
    expect(devicesDataController).toBeDefined();
  });
});
