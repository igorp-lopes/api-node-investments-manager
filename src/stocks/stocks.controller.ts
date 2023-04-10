import { Body, Controller, Delete, Param, Post, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';
import {
  DeleteStockRecordsRequest,
  RegisterStockRequest,
} from './stocks.schemas';
import { StocksMapper } from './stocks.mapper';

@Controller('stocks')
export class StocksController {
  constructor(
    private stocksService: StocksService,
    private stocksMapper: StocksMapper,
  ) {}

  @Post()
  async addStockRecord(@Body() stockData: RegisterStockRequest) {
    const builtStock = this.stocksMapper.buildStock(stockData);
    const createdStock = await this.stocksService.addStockRecord(builtStock);

    return this.stocksMapper.fromEntityToClient(createdStock);
  }

  @Delete('/:stockName')
  async deleteStockRecord(
    @Param() params,
    @Query() query: DeleteStockRecordsRequest,
  ): Promise<any> {
    const stockName = params.stockName;
    const { start_date: startDate, end_date: endDate } = query;

    return await this.stocksService.deleteStockRecords(
      stockName.toUpperCase(),
      startDate,
      endDate,
    );
  }
}
