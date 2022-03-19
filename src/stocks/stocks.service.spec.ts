import { Test, TestingModule } from '@nestjs/testing';
import { StocksService } from './stocks.service';
import { StocksRepository } from './stocks.repository';
import { PrismaService } from '../core/prisma.service';
import {
  testRegisterStockRequest1,
  testRegisterStockRequest2,
  testStockRecord1,
  testStockRecord2,
} from '../../test/mocks/stockMocks';
import { ErrorsService } from '../core/errors/errors.service';
import { StocksRegisterResponseDto } from './stocks.models';

const db = {
  stocks: {
    findFirst: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockReturnValue(null),
    delete: jest.fn().mockResolvedValue(null),
  },
};

const convertDateToProperString = (date) => {
  return date.toISOString().split('T')[0];
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
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<StocksService>(StocksService);
    repository = module.get<StocksRepository>(StocksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addStockRecord', () => {
    const basicStockRecordValidation = (
      stockRecord: StocksRegisterResponseDto,
      registerStockRequest,
    ) => {
      expect(stockRecord.stock).toEqual(
        registerStockRequest.stock.toUpperCase(),
      );
      expect(stockRecord.day).toEqual(
        convertDateToProperString(registerStockRequest.day),
      );
      expect(stockRecord.quotas).toEqual(registerStockRequest.quotas);
      expect(stockRecord.current_quota_value).toEqual(
        registerStockRequest.current_quota_value,
      );
      expect(stockRecord.contribution).toEqual(
        registerStockRequest.contribution,
      );
      expect(stockRecord.category).toEqual(registerStockRequest.category);
    };

    describe('when adding a record that already exists', () => {
      it('should return a error when there is already record on the same date', async () => {
        jest
          .spyOn(repository, 'getStockRecordByNameAndDate')
          .mockResolvedValueOnce(testStockRecord1);

        await expect(
          service.addStockRecord(testRegisterStockRequest1),
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
          testRegisterStockRequest1,
        );

        basicStockRecordValidation(
          addStockRecordResponse,
          testRegisterStockRequest1,
        );

        expect(addStockRecordResponse.variation).toBeCloseTo(0);
        expect(addStockRecordResponse.variation_percent).toBeCloseTo(0);
        expect(addStockRecordResponse.daily_variation).toBeCloseTo(0);
        expect(addStockRecordResponse.daily_variation_percent).toBeCloseTo(0);

        expect(addStockRecordResponse.mean_quota_value).toBeCloseTo(
          testRegisterStockRequest1.current_quota_value,
        );

        expect(addStockRecordResponse.invested_value).toBeCloseTo(
          testRegisterStockRequest1.quotas *
            addStockRecordResponse.mean_quota_value,
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
          testRegisterStockRequest2,
        );

        basicStockRecordValidation(
          addStockRecordResponse,
          testRegisterStockRequest2,
        );

        expect(addStockRecordResponse.variation).toBeCloseTo(275);
        expect(addStockRecordResponse.variation_percent).toBeCloseTo(0.035);
        expect(addStockRecordResponse.daily_variation).toBeCloseTo(275);
        expect(addStockRecordResponse.daily_variation_percent).toBeCloseTo(
          0.038,
        );

        expect(addStockRecordResponse.mean_quota_value).toBeCloseTo(130.416);

        expect(addStockRecordResponse.invested_value).toBeCloseTo(7824.999);
      });
    });
  });
});
