import { Test, TestingModule } from '@nestjs/testing';
import { StatusesService } from './statuses.service';
import { DatabaseModule } from '../database/database.module';

describe('StatusesService', () => {
  let service: StatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [StatusesService],
    }).compile();

    service = module.get<StatusesService>(StatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
