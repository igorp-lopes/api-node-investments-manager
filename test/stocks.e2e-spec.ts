import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StocksModule } from '../src/stocks/stocks.module';
import { PrismaService } from '../src/core/prisma.service';
import { cleanupDatabase, setupGlobalModules } from './utils/generalTestUtils';
import { addManyStockRecords, setupStocksDatabase } from './seeds/stocksSeeds';
import {
  StockRecordsBuilder,
  StocksRequestBuilder,
} from './mocks/stocksBuilders';
import { StocksMapper } from '../src/stocks/stocks.mapper';

const stockRecordsBuilder = new StockRecordsBuilder();
const stocksRequestBuilder = new StocksRequestBuilder();
const stocksMapper = new StocksMapper();

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

  describe('(POST) /stocks', () => {
    test('Creating a stock record without previous records', async () => {
      const stockEntity =
        stockRecordsBuilder.createStockRecordWithoutPreviousRecord();
      const requestBody =
        stocksRequestBuilder.createStockRecordRequestFromStockEntity(
          stockEntity,
        );
      const expectedResponse = stocksMapper.fromEntityToClient(stockEntity);

      const postResponse = await request(app.getHttpServer())
        .post('/stocks')
        .send(requestBody);
      const content = postResponse.body;

      expect(postResponse.status).toEqual(201);
      expect(content).toMatchObject(expectedResponse);
    });

    test('Creating a stock record with previous records', async () => {
      const previousStockEntity =
        stockRecordsBuilder.createStockRecordWithoutPreviousRecord();

      const stockEntity =
        stockRecordsBuilder.createStockRecordFromPreviousRecord(
          previousStockEntity,
        );

      const previousDbStockRecord =
        stocksMapper.fromEntityToPersistence(previousStockEntity);
      await addManyStockRecords(prisma, [previousDbStockRecord]);

      const requestBody =
        stocksRequestBuilder.createStockRecordRequestFromStockEntity(
          stockEntity,
        );
      const expectedResponse = stocksMapper.fromEntityToClient(stockEntity);

      const postResponse = await request(app.getHttpServer())
        .post('/stocks')
        .send(requestBody);
      const content = postResponse.body;

      expect(postResponse.status).toEqual(201);
      expect(content).toMatchObject(expectedResponse);
    });

    test('Creating a stock record that already exists', async () => {
      const stockEntity =
        stockRecordsBuilder.createStockRecordWithoutPreviousRecord();

      const stockRequest =
        stocksRequestBuilder.createStockRecordRequestFromStockEntity(
          stockEntity,
        );

      const dbStockRecord = stocksMapper.fromEntityToPersistence(stockEntity);
      await addManyStockRecords(prisma, [dbStockRecord]);

      const postResponse = await request(app.getHttpServer())
        .post('/stocks')
        .send(stockRequest);
      const content = postResponse.body;

      expect(postResponse.status).toEqual(400);
      expect(content.name).toEqual('EST001');
    });
  });

  describe('(DELETE) /stocks/{stock_name}', () => {
    const deleteStockRecordCases = [
      ['from a single date', '2022-04-01', '', 1],
      ['from a date interval', '2022-04-02', '2022-04-03', 2],
    ];

    test.each(deleteStockRecordCases)(
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

    test.each(deleteStockRecordCases)(
      'Deleting stock records that do not exists %s',
      async (testName, startDate, endDate) => {
        const stockName = 'StockThatDoNotExists';
        const deleteResponse = await request(app.getHttpServer())
          .delete(`/stocks/${stockName}`)
          .query(
            endDate
              ? { start_date: startDate, end_date: endDate }
              : { start_date: startDate },
          );
        const error = deleteResponse.body;
        expect(error.status).toEqual(404);
        expect(error.name).toEqual('EST002');
      },
    );
  });
});
