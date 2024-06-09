import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { RxDBService } from 'src/database/rxdb.service';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';

describe('StatusesController', () => {
  let controller: StatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusesController],
      providers: [StatusesService, RxDBService, ConfigService],
    }).compile();

    controller = module.get<StatusesController>(StatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
