import { Body, Controller, Post } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { RegisterStockDto, StocksRegisterInfoDto } from './stocks.models';

@Controller('stocks')
export class StocksController {
  constructor(private stocksService: StocksService) {}

  @Post()
  async addStockRecord(
    @Body() stockData: RegisterStockDto,
  ): Promise<StocksRegisterInfoDto> {
    return this.stocksService.addStockRecord(stockData);
  }
}
