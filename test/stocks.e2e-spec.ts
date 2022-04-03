import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StocksModule } from '../src/stocks/stocks.module';
import { PrismaService } from '../src/core/prisma.service';
import { cleanupDatabase, setupGlobalModules } from './testUtils';
import {
  testStockWithoutPreviousRecordRequest,
  testStockWithoutPreviousRecordResponse,
} from './mocks/stockMocks';

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

    await cleanupDatabase(prisma);

    await app.init();
  });

  afterAll(async () => {
    await cleanupDatabase(prisma);
  });

  const cases = [
    ['without previous records', testStockWithoutPreviousRecordRequest],
  ];

  it.each(cases)('Creating a stock record %s', async (name, requestBody) => {
    const postResponse = await request(app.getHttpServer())
      .post('/stocks')
      .send(requestBody);
    const content = postResponse.body;

    expect(postResponse.status).toEqual(201);
    expect(content).toMatchObject(testStockWithoutPreviousRecordResponse);
  });
});
