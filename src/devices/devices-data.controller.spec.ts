import { Test, TestingModule } from '@nestjs/testing';
import { DevicesDataController } from './devices-data.controller';
import { DevicesDataService } from './devices-data.service';
import { DatabaseModule } from 'src/database/database.module';

describe('DevicesDataController', () => {
  let devicesDataController: DevicesDataController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [DevicesDataController],
      providers: [DevicesDataService],
    }).compile();

    devicesDataController = app.get<DevicesDataController>(
      DevicesDataController,
    );
  });

  it('should be defined', () => {
    expect(devicesDataController).toBeDefined();
  });
});
