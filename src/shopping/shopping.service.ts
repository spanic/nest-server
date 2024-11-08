import { Injectable } from '@nestjs/common';
import { OfferData } from '../shared/models/offer-data.model';
import { RxDbService } from '../database/rx-db.service';

@Injectable()
export class ShoppingService {
  constructor(private rxDbService: RxDbService) {}

  async getOffers(): Promise<OfferData[]> {
    return await this.rxDbService.shoppingDb.offersCollection.find().exec();
  }
}
