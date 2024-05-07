import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { DeviceData } from 'src/shared/models/device-data.model';
import { SWAGGER_TAGS } from 'src/swagger/swagger-tags';
import { DevicesDataService } from './devices-data.service';

@ApiTags(SWAGGER_TAGS.Devices)
@Controller('devices')
export class DevicesDataController {
  constructor(private readonly appService: DevicesDataService) {}

  @Get()
  @ApiBearerAuth()
  @ApiCookieAuth()
  async getDevicesData(): Promise<DeviceData[]> {
    return await this.appService.getDevicesData();
  }
}
