import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ErrorsModule } from './core/errors/errors.module';
import { ReitsModule } from './reits/reits.module';
import { StocksModule } from './stocks/stocks.module';

describe('App Module Unit Tests', () => {
  let errorsModule: ErrorsModule;
  let stocksModule: StocksModule;
  let reitsModule: ReitsModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, StocksModule, ReitsModule, ErrorsModule],
    }).compile();

    errorsModule = module.get<ErrorsModule>(ErrorsModule);
    stocksModule = module.get<StocksModule>(StocksModule);
    reitsModule = module.get<ReitsModule>(ReitsModule);
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
    expect(errorsModule).toBeInstanceOf(ErrorsModule);
    expect(stocksModule).toBeInstanceOf(StocksModule);
    expect(reitsModule).toBeInstanceOf(ReitsModule);
  });
});
