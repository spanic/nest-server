import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ShoppingController } from '../src/shopping/shopping.controller';
import { ShoppingService } from '../src/shopping/shopping.service';
import { OfferData } from '../src/shared/models/offer-data.model';
import { DatabaseModule } from 'src/database/database.module';
import { NodeEnvironment } from '../src/shared/models/node-environment.enum';

describe('Shopping', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [ShoppingController],
      providers: [ShoppingService],
    })
      .overrideProvider('NODE_ENV')
      .useValue(NodeEnvironment.Production)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET /shopping/offers`, () => {
    return request(app.getHttpServer())
      .get('/shopping/offers')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.length).toBeGreaterThan(0);
        expect(
          res.body.forEach((offer: OfferData) =>
            expect(offer).toEqual({
              id: expect.any(String),
              name: expect.any(String),
              description: expect.any(String),
              price: expect.any(Number),
            }),
          ),
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
