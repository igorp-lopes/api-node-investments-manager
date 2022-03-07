import { Test, TestingModule } from '@nestjs/testing';
import { StocksService } from './stocks.service';
import { StocksRepository } from './stocks.repository';
import { StocksModule } from './stocks.module';
import { StocksController } from './stocks.controller';

describe('Stocks Module Unit Tests', () => {
  let controller: StocksController;
  let service: StocksService;
  let repository: StocksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [StocksModule],
    }).compile();

    controller = module.get<StocksController>(StocksController);
    service = module.get<StocksService>(StocksService);
    repository = module.get<StocksRepository>(StocksRepository);
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
    expect(controller).toBeInstanceOf(StocksController);
    expect(service).toBeInstanceOf(StocksService);
    expect(repository).toBeInstanceOf(StocksRepository);
  });
});
