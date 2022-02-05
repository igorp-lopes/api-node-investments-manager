import { Body, Controller, Post } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { Stocks } from '@prisma/client';
import { RegisterStockDto } from './stocks.models';

@Controller('stocks')
export class StocksController {
  constructor(private stocksService: StocksService) {}

  @Post()
  async addStockRecord(@Body() stockData: RegisterStockDto): Promise<Stocks> {
    return this.stocksService.addStockRecord(stockData);
  }
}
