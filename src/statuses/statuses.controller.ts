import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { StatusesData } from 'src/shared/models/statuses-data.model';
import { SWAGGER_TAGS } from 'src/swagger/swagger-tags';
import { StatusesService } from './statuses.service';

@ApiTags(SWAGGER_TAGS.Devices)
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
