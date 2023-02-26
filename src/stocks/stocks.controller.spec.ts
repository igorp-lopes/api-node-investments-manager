import { Test, TestingModule } from '@nestjs/testing';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { StocksRepository } from './stocks.repository';
import { PrismaService } from '../core/prisma.service';
import { StocksMapper } from './stocks.mapper';

describe('Stocks Controller Unit Tests', () => {
  let controller: StocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StocksController],
      providers: [StocksService, StocksRepository, PrismaService, StocksMapper],
    }).compile();

    controller = module.get<StocksController>(StocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
