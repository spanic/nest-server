import { Test, TestingModule } from '@nestjs/testing';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';
import { DatabaseModule } from '../database/database.module';

describe('StatusesController', () => {
  let controller: StatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [StatusesController],
      providers: [StatusesService],
    }).compile();

    controller = module.get<StatusesController>(StatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
