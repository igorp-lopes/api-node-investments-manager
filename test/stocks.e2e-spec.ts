import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StocksModule } from '../src/stocks/stocks.module';
import { PrismaService } from '../src/core/prisma.service';
import { cleanupDatabase, setupGlobalModules } from './testUtils';
import {
  testStockWithoutPreviousRecordRequest,
  testStockWithoutPreviousRecordResponse,
  testStockWithPreviousRecordRequest,
  testStockWithPreviousRecordResponse,
  testStockWithRepeatedRecordRequest,
} from './mocks/stockMocks';
import { setupStocksDatabase } from './seeds/stocksSeeds';

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
    await setupStocksDatabase(prisma);

    await app.init();
  });

  afterAll(async () => {
    await cleanupDatabase(prisma);
  });

  const stockRecordCases = [
    [
      'without previous records',
      testStockWithoutPreviousRecordRequest,
      testStockWithoutPreviousRecordResponse,
    ],
    [
      'with previous records',
      testStockWithPreviousRecordRequest,
      testStockWithPreviousRecordResponse,
    ],
  ];

  it.each(stockRecordCases)(
    'Creating a stock record %s',
    async (name, requestBody, expectedResponse) => {
      const postResponse = await request(app.getHttpServer())
        .post('/stocks')
        .send(requestBody);
      const content = postResponse.body;

      expect(postResponse.status).toEqual(201);
      expect(content).toMatchObject(expectedResponse);
    },
  );

  it('Creating a stock record that already exists', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/stocks')
      .send(testStockWithRepeatedRecordRequest);
    const content = postResponse.body;

    expect(postResponse.status).toEqual(400);
    expect(content.name).toEqual('EST001');
  });
});
