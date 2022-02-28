import { Test, TestingModule } from '@nestjs/testing';
import { StocksService } from './stocks.service';
import { StocksRepository } from './stocks.repository';
import { PrismaService } from '../core/prisma.service';

describe('Stocks Service Unit Tests', () => {
  let service: StocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StocksService, StocksRepository, PrismaService],
    }).compile();

    service = module.get<StocksService>(StocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
