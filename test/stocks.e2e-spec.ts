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

  const createStockRecordCases = [
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

  it.each(createStockRecordCases)(
    'Creating a stock record %s',
    async (testName, requestBody, expectedResponse) => {
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

  const deleteStockRecordCases = [
    ['from a single date', '2022-04-01', '', 1],
    ['from a date interval', '2022-04-02', '2022-04-03', 2],
  ];

  it.each(deleteStockRecordCases)(
    'Deleting stock records %s',
    async (testName, startDate, endDate, totalDeleted) => {
      const stockName = 'StockToBeDeleted';
      const deleteResponse = await request(app.getHttpServer())
        .delete(`/stocks/${stockName}`)
        .query(
          endDate
            ? { start_date: startDate, end_date: endDate }
            : { start_date: startDate },
        );
      const content = deleteResponse.body;

      expect(deleteResponse.status).toEqual(200);
      expect(content.count).toEqual(totalDeleted);
    },
  );
});
