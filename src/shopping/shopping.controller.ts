import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'src/swagger/swagger-tags';
import { OfferData } from '../shared/models/offer-data.model';
import { ShoppingService } from './shopping.service';
import { Public } from '../auth/public.decorator';

@ApiTags(SWAGGER_TAGS.Shopping)
@Controller('shopping')
export class ShoppingController {
  constructor(private readonly shoppingService: ShoppingService) {}

  @Public()
  @Get('/offers')
  async getOffers(): Promise<OfferData[]> {
    return await this.shoppingService.getOffers();
  }
}
