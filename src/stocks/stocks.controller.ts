import { Controller, Post } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private stocksService: StocksService) {}

  @Post()
  addStockRecords(): string {
    return this.stocksService.addStockRecord();
  }
}
