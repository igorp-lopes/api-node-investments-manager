import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../core/prisma.service';
import { StocksRepository } from './stocks.repository';

describe('Stocks Repository Unit Tests', () => {
  let repository: StocksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StocksRepository, PrismaService],
    }).compile();

    repository = module.get<StocksRepository>(StocksRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
