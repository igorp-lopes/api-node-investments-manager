import { Body, Controller, Delete, Param, Post, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksRegisterResponseDto } from './stocks.models';
import {
  DeleteStockRecordsRequestSchema,
  RegisterStockRequestSchema,
} from './stocks.schemas';

@Controller('stocks')
export class StocksController {
  constructor(private stocksService: StocksService) {}

  @Post()
  async addStockRecord(
    @Body() stockData: RegisterStockRequestSchema,
  ): Promise<StocksRegisterResponseDto> {
    return this.stocksService.addStockRecord(stockData);
  }

  @Delete('/:stock_name')
  async deleteStockRecord(
    @Param() params,
    @Query() query: DeleteStockRecordsRequestSchema,
  ): Promise<any> {
    const stockName = params.stock_name;
    const startDate = query.start_date;
    const endDate = query.end_date;

    return await this.stocksService.deleteStockRecords(
      stockName.toUpperCase(),
      startDate,
      endDate,
    );
  }
}
