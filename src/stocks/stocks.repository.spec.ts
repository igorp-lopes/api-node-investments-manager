import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../core/prisma.service';
import { StocksRepository } from './stocks.repository';
import {
  stockRepositoryResponse,
  testStockRecord1,
} from '../../test/mocks/stockMocks';
import { StocksMapper } from './stocks.mapper';

describe('Stocks Repository Unit Tests', () => {
  let repository: StocksRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StocksRepository, PrismaService, StocksMapper],
    }).compile();

    repository = module.get<StocksRepository>(StocksRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('saveStock', () => {
    it('should save a stock record', async () => {
      prisma.stocks.create = jest.fn().mockReturnValueOnce(testStockRecord1);

      const repResponse = repository.saveStock({
        id: testStockRecord1.id,
        stock: 'testStock1',
        category: 'stocks',
        date: '2022-02-18',
        quotas: 55,
        currentQuotaValue: 130,
        meanQuotaValue: 130,
        contribution: 7150,
        currentValue: 130,
        investedValue: 130,
        dailyVariation: 0,
        dailyVariationPercent: 0,
        variation: 0,
        variationPercent: 0,
      });

      await expect(repResponse).resolves.toEqual({
        ...stockRepositoryResponse,
        id: testStockRecord1.id,
      });
    });
  });

  describe('getStockRecordByNameAndDate', () => {
    it('should return a stock record if it exists', async () => {
      prisma.stocks.findFirst = jest.fn().mockReturnValueOnce(testStockRecord1);

      const stockName = 'testStock1';
      const date = new Date('2022-02-19');

      const repResponse = repository.getStockRecordByNameAndDate(
        stockName,
        date,
      );

      await expect(repResponse).resolves.toEqual({
        ...stockRepositoryResponse,
        id: testStockRecord1.id,
      });
    });

    it('should return no record if none exist', async () => {
      prisma.stocks.findFirst = jest.fn().mockReturnValueOnce(null);

      const stockName = 'nothing';
      const date = new Date('2022-02-19');

      const repResponse = repository.getStockRecordByNameAndDate(
        stockName,
        date,
      );

      await expect(repResponse).resolves.toEqual(null);
    });
  });

  describe('getPreviousStockRecordsFromDate', () => {
    it('should return a record if it exist', async () => {
      prisma.stocks.findFirst = jest.fn().mockReturnValueOnce(testStockRecord1);

      const stockName = 'testStock1';
      const date = new Date('2022-02-19');

      const repResponse = repository.getPreviousStockRecordsFromDate(
        stockName,
        date,
      );

      await expect(repResponse).resolves.toEqual({
        ...stockRepositoryResponse,
        id: testStockRecord1.id,
      });
    });

    it('should return no record if none exist', async () => {
      prisma.stocks.findFirst = jest.fn().mockReturnValueOnce(null);

      const stockName = 'nothing';
      const date = new Date('2022-02-19');

      const repResponse = repository.getPreviousStockRecordsFromDate(
        stockName,
        date,
      );

      await expect(repResponse).resolves.toEqual(null);
    });
  });

  describe('deleteStockRecordByDate', () => {
    it('should inform that one record was deleted if it exists', async () => {
      prisma.stocks.deleteMany = jest.fn().mockReturnValueOnce({ count: 1 });

      const date = new Date(testStockRecord1.date);
      const stock = testStockRecord1.stock;

      const repResponse = repository.deleteStockRecordByDate(stock, date);
      await expect(repResponse).resolves.toEqual({ count: 1 });
    });

    it('should inform that no record was deleted if it does not exists', async () => {
      prisma.stocks.deleteMany = jest.fn().mockReturnValueOnce({ count: 0 });

      const date = new Date(testStockRecord1.date);
      const stock = 'nothing';

      const repResponse = repository.deleteStockRecordByDate(stock, date);
      await expect(repResponse).resolves.toEqual({ count: 0 });
    });
  });

  describe('deleteStockRecordsByDateInterval', () => {
    it('should inform that X records were deleted if they exist', async () => {
      prisma.stocks.deleteMany = jest.fn().mockReturnValueOnce({ count: 5 });

      const startDate = new Date('2022-01-01');
      const endDate = new Date('2022-02-01');
      const stock = testStockRecord1.stock;

      const repResponse = repository.deleteStockRecordsByDateInterval(
        stock,
        startDate,
        endDate,
      );
      await expect(repResponse).resolves.toEqual({ count: 5 });
    });

    it('should inform that no record was deleted if none exists', async () => {
      prisma.stocks.deleteMany = jest.fn().mockReturnValueOnce({ count: 0 });

      const startDate = new Date('01/01/2022');
      const endDate = new Date('01/02/2022');
      const stock = 'nothing';

      const repResponse = repository.deleteStockRecordsByDateInterval(
        stock,
        startDate,
        endDate,
      );
      await expect(repResponse).resolves.toEqual({ count: 0 });
    });
  });
});
