import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import {
  DeleteStockRecordsQueryDto,
  RegisterStockDto,
  StocksRegisterInfoDto,
} from './stocks.models';

@Controller('stocks')
export class StocksController {
  constructor(private stocksService: StocksService) {}

  @Post()
  async addStockRecord(
    @Body() stockData: RegisterStockDto,
  ): Promise<StocksRegisterInfoDto> {
    return this.stocksService.addStockRecord(stockData);
  }

  @Delete('/:stock_name')
  @HttpCode(204)
  async deleteStockRecord(
    @Param() params,
    @Query() query: DeleteStockRecordsQueryDto,
  ): Promise<void> {
    const stockName = params.stock_name;
    const startDate = query.start_date;
    const endDate = query.end_date;

    return this.stocksService.deleteStockRecords(
      stockName.toUpperCase(),
      startDate,
      endDate,
    );
  }
}
