import { Injectable } from '@nestjs/common';
import { StocksRepository } from './stocks.repository';

@Injectable()
export class StocksService {
  constructor(private stocksRepository: StocksRepository) {}

  addStockRecord(): string {
    return this.stocksRepository.saveStock();
  }
}
