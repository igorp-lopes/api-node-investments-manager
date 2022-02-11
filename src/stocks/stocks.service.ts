import { Injectable } from '@nestjs/common';
import { StocksRepository } from './stocks.repository';
import { RegisterStockDto, StocksRegisterInfoDto } from './stocks.models';
import { Prisma } from '@prisma/client';

@Injectable()
export class StocksService {
  constructor(private stocksRepository: StocksRepository) {}

  public async addStockRecord(
    data: RegisterStockDto,
  ): Promise<StocksRegisterInfoDto> {
    const stockInfo = StocksService.createStockRecord(data);

    const createdStock = await this.stocksRepository.saveStock(stockInfo);

    return createdStock as StocksRegisterInfoDto;
  }

  public async deleteStockRecords(
    stockName: string,
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    if (!endDate) {
      return this.stocksRepository.deleteStockRecordByDate(
        stockName,
        startDate,
      );
    } else {
      return this.stocksRepository.deleteStockRecordsByDateInterval(
        stockName,
        startDate,
        endDate,
      );
    }
  }

  private static createStockRecord(
    data: RegisterStockDto,
  ): Prisma.StocksCreateInput {
    const { stock, day, contribution, quotas } = data;
    const currentQuotaValue = data.current_quota_value;

    const meanQuotaValue = currentQuotaValue;
    const variation = 0;
    const variationPercent = 0;

    const category = data.category ?? 'stocks';

    const currentDate = new Date(Date.now());

    return {
      stock,
      day,
      contribution,
      quotas,
      currentQuotaValue,
      currentValue: quotas * currentQuotaValue,
      meanQuotaValue,
      investedValue: quotas * meanQuotaValue,
      variation,
      variationPercent,
      category,
      createdAt: currentDate.toISOString(),
      updatedAt: currentDate.toISOString(),
    };
  }
}
