import { Test, TestingModule } from '@nestjs/testing';
import { StocksService } from './stocks.service';
import { StocksRepository } from './stocks.repository';
import { PrismaService } from '../core/prisma.service';
import {
  testMappedStock1,
  testMappedStock2,
  testRegisterStockRequest1,
  testRegisterStockRequest2,
  testStockRecord1,
  testStockRecord2,
} from '../../test/mocks/stockMocks';
import { ErrorsService } from '../core/errors/errors.service';
import { Stock } from './stocks.models';
import { StocksMapper } from './stocks.mapper';

const db = {
  stocks: {
    findFirst: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockReturnValue(null),
    delete: jest.fn().mockResolvedValue(null),
  },
};

describe('Stocks Service Unit Tests', () => {
  let service: StocksService;
  let repository: StocksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StocksService,
        StocksRepository,
        ErrorsService,
        StocksMapper,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<StocksService>(StocksService);
    repository = module.get<StocksRepository>(StocksRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addStockRecord', () => {
    describe('when adding a record that already exists', () => {
      it('should return a error that there is already record on the same date', async () => {
        jest
          .spyOn(repository, 'getStockRecordByNameAndDate')
          .mockResolvedValueOnce(testStockRecord1);

        await expect(
          service.addStockRecord(testMappedStock1),
        ).rejects.toThrowError();
      });
    });

    describe('when adding a record with no previous record', () => {
      it('should save a record with no variations', async () => {
        jest
          .spyOn(repository, 'getStockRecordByNameAndDate')
          .mockResolvedValueOnce(null);

        jest
          .spyOn(repository, 'getPreviousStockRecordsFromDate')
          .mockResolvedValueOnce(null);

        jest
          .spyOn(repository, 'saveStock')
          .mockResolvedValueOnce(testStockRecord1);

        const addStockRecordResponse = await service.addStockRecord(
          testMappedStock1,
        );

        basicStockRecordValidation(
          addStockRecordResponse,
          testRegisterStockRequest1,
        );

        expect(addStockRecordResponse.variation).toBeCloseTo(0);
        expect(addStockRecordResponse.variationPercent).toBeCloseTo(0);
        expect(addStockRecordResponse.dailyVariation).toBeCloseTo(0);
        expect(addStockRecordResponse.dailyVariationPercent).toBeCloseTo(0);

        expect(addStockRecordResponse.meanQuotaValue).toBeCloseTo(
          testRegisterStockRequest1.current_quota_value,
        );

        expect(addStockRecordResponse.investedValue).toBeCloseTo(
          testRegisterStockRequest1.quotas *
            addStockRecordResponse.meanQuotaValue,
        );
      });
    });

    describe('when adding a record with previous records', () => {
      it('should save a record with correct info that is inferred based on previous records', async () => {
        jest
          .spyOn(repository, 'getStockRecordByNameAndDate')
          .mockResolvedValueOnce(null);

        jest
          .spyOn(repository, 'getPreviousStockRecordsFromDate')
          .mockResolvedValueOnce(testStockRecord1);

        jest
          .spyOn(repository, 'saveStock')
          .mockResolvedValueOnce(testStockRecord2);

        const addStockRecordResponse = await service.addStockRecord(
          testMappedStock2,
        );

        basicStockRecordValidation(
          addStockRecordResponse,
          testRegisterStockRequest2,
        );

        expect(addStockRecordResponse.variation).toBeCloseTo(275);
        expect(addStockRecordResponse.variationPercent).toBeCloseTo(0.035);
        expect(addStockRecordResponse.dailyVariation).toBeCloseTo(275);
        expect(addStockRecordResponse.dailyVariationPercent).toBeCloseTo(0.038);

        expect(addStockRecordResponse.meanQuotaValue).toBeCloseTo(130.416);

        expect(addStockRecordResponse.investedValue).toBeCloseTo(7824.999);
      });
    });
  });

  describe('deleteStockRecords', () => {
    describe('when deleting a single record', () => {
      it('should delete the record if it exists, and inform that 1 record was deleted', async () => {
        jest
          .spyOn(repository, 'deleteStockRecordByDate')
          .mockResolvedValueOnce({ count: 1 });

        const stock = 'TESTSTOCK1';
        const date = new Date('2022-02-19');

        const deleteStockRecordsResponse = await service.deleteStockRecords(
          stock,
          date,
        );

        expect(deleteStockRecordsResponse).toHaveProperty('count');
        expect(deleteStockRecordsResponse.count).toEqual(1);
      });

      it('should return an error if there is no record for the given stock on the given date', async () => {
        jest
          .spyOn(repository, 'deleteStockRecordByDate')
          .mockResolvedValueOnce({ count: 0 });

        const stock = 'TESTSTOCK1';
        const date = new Date('2022-02-19');

        await expect(
          service.deleteStockRecords(stock, date),
        ).rejects.toThrowError();
      });
    });

    describe('when deleting multiple record', () => {
      it('should delete the records if they exists, and inform that X records were deleted', async () => {
        jest
          .spyOn(repository, 'deleteStockRecordsByDateInterval')
          .mockResolvedValueOnce({ count: 4 });

        const stock = 'TESTSTOCK1';
        const startDate = new Date('2022-02-19');
        const endDate = new Date('2022-03-19');

        const deleteStockRecordsResponse = await service.deleteStockRecords(
          stock,
          startDate,
          endDate,
        );

        expect(deleteStockRecordsResponse).toHaveProperty('count');
        expect(deleteStockRecordsResponse.count).toEqual(4);
      });

      it('should return an error if there is no record for the given stock on the given date', async () => {
        jest
          .spyOn(repository, 'deleteStockRecordsByDateInterval')
          .mockResolvedValueOnce({ count: 0 });

        const stock = 'TESTSTOCK1';
        const startDate = new Date('2022-02-19');
        const endDate = new Date('2022-03-19');

        await expect(
          service.deleteStockRecords(stock, startDate, endDate),
        ).rejects.toThrowError();
      });
    });
  });
});

function basicStockRecordValidation(stockRecord: Stock, registerStockRequest) {
  expect(stockRecord.stock).toEqual(registerStockRequest.stock.toUpperCase());
  expect(stockRecord.date).toEqual(registerStockRequest.date);
  expect(stockRecord.quotas).toEqual(registerStockRequest.quotas);
  expect(stockRecord.currentQuotaValue).toEqual(
    registerStockRequest.current_quota_value,
  );
  expect(stockRecord.contribution).toEqual(registerStockRequest.contribution);
  expect(stockRecord.category).toEqual(registerStockRequest.category);
}
