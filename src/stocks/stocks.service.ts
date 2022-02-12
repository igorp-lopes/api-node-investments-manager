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
    const stockInfo = await this.createStockRecord(data);

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

  private async createStockRecord(
    data: RegisterStockDto,
  ): Promise<Prisma.StocksCreateInput> {
    const { stock, day, quotas } = data;
    const currentQuotaValue = data.current_quota_value;

    const meanQuotaValue = currentQuotaValue;
    const variation = 0;
    const variationPercent = 0;
    const contribution = data.contribution ?? 0;

    const category = data.category ?? 'stocks';

    const currentDate = new Date(Date.now());

    const mostRecentPreviousRecord =
      await this.stocksRepository.getPreviousStockRecordsFromDate(stock, day);

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

  private static updateMeanQuotaValue(
    previousMeanQuota: number,
    currentQuotaValue: number,
    previousQuotas: number,
    currentQuotas: number,
  ) {
    return (
      (previousMeanQuota * previousQuotas + currentQuotaValue * currentQuotas) /
      (previousQuotas + currentQuotas)
    );
  }
}
