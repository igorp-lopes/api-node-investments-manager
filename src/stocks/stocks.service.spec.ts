import { Test, TestingModule } from '@nestjs/testing';
import { StocksService } from './stocks.service';
import { StocksRepository } from './stocks.repository';
import { PrismaService } from '../core/prisma.service';
import {
  testRegisterStockRequest,
  testStockRecord1,
} from '../../test/mocks/stockMocks';
import { ErrorsService } from '../core/errors/errors.service';

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
    describe('when adding a record that already exists', () => {
      it('should return a error when there is already record on the same date', async () => {
        const stocksRepositorySpy = jest
          .spyOn(repository, 'getPreviousStockRecordsFromDate')
          .mockResolvedValueOnce(testStockRecord1);

        await expect(
          service.addStockRecord(testRegisterStockRequest),
        ).rejects.toThrowError();
      });
    });
  });
});
