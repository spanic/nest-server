import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'src/swagger/swagger-tags';
import { OfferData } from '../shared/models/offer-data.model';
import { ShoppingService } from './shopping.service';

@ApiTags(SWAGGER_TAGS.Shopping)
@Controller('shopping')
export class ShoppingController {
  constructor(private readonly shoppingService: ShoppingService) {}

  @Get('/offers')
  @ApiBearerAuth()
  @ApiCookieAuth()
  async getOffers(): Promise<OfferData[]> {
    return await this.shoppingService.getOffers();
  }
}
