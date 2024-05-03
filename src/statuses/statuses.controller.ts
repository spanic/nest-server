import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { StatusesData } from 'src/shared/models/statuses-data.model';
import { StatusesService } from './statuses.service';

@ApiTags('Devices & statuses')
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get()
  @ApiBearerAuth()
  @ApiCookieAuth()
  findAll(): Promise<StatusesData> {
    return this.statusesService.findAll();
  }
}
