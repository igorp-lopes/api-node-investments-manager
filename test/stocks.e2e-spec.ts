import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StocksModule } from '../src/stocks/stocks.module';
import { PrismaService } from '../src/core/prisma.service';
import { cleanupDatabase, setupGlobalModules } from './testUtils';
import { RegisterStockRequestDto } from '../src/stocks/stocks.models';

describe('Stocks End-to-End Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [StocksModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupGlobalModules(app);

    prisma = app.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await cleanupDatabase(prisma);
  });

  it('Creating a stock record without previous records', async () => {
    const requestBody = createStockRecordDTO(
      'stockWithNoRecord',
      '2022-04-01',
      10,
      55.5,
    );

    const postResponse = await request(app.getHttpServer())
      .post('/stocks')
      .send(requestBody);
    const content = postResponse.body;

    expect(postResponse.status).toEqual(201);
    expect(content.stock).toEqual(requestBody.stock.toUpperCase());
    expect(content.quotas).toEqual(requestBody.quotas);
    expect(content.day).toEqual(requestBody.day);

    expect(content.mean_quota_value).toBeCloseTo(55.5);
    expect(content.contribution).toBeCloseTo(555);
    expect(content.invested_value).toBeCloseTo(555);

    expect(content.daily_variation).toBeCloseTo(0);
    expect(content.daily_variation_percent).toBeCloseTo(0);

    expect(content.variation).toBeCloseTo(0);
    expect(content.variation_percent).toBeCloseTo(0);
  });
});

const createStockRecordDTO = (
  name,
  day,
  quotas,
  currentQuotaValue,
  category?,
) => {
  return {
    stock: name,
    day,
    quotas,
    current_quota_value: currentQuotaValue,
    category: category ?? 'stocks',
  } as RegisterStockRequestDto;
};
