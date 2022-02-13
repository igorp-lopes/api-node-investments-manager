import { Injectable } from '@nestjs/common';
import { StocksRepository } from './stocks.repository';
import { RegisterStockDto, StocksRegisterInfoDto } from './stocks.models';

@Injectable()
export class StocksService {
  constructor(private stocksRepository: StocksRepository) {}

  public async addStockRecord(
    data: RegisterStockDto,
  ): Promise<StocksRegisterInfoDto> {
    const stockRecordData = await this.determineStockRecordData(data);

    const createdStock = await this.stocksRepository.saveStock(stockRecordData);

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

  private async determineStockRecordData(data: RegisterStockDto) {
    const { stock, day, quotas } = data;
    const currentQuotaValue = data.current_quota_value;
    let meanQuotaValue: number;
    let variation: number;
    let variationPercent: number;
    let contribution = 0;

    const mostRecentPreviousRecord =
      await this.stocksRepository.getPreviousStockRecordsFromDate(stock, day);

    if (!mostRecentPreviousRecord) {
      meanQuotaValue = currentQuotaValue;
      variation = 0;
      variationPercent = 0;
      contribution = data.contribution ?? quotas * currentQuotaValue;
    } else {
      const quotaDiff = quotas - mostRecentPreviousRecord.quotas;
      meanQuotaValue = StocksService.updateMeanQuotaValue(
        mostRecentPreviousRecord.meanQuotaValue,
        mostRecentPreviousRecord.quotas,
        currentQuotaValue,
        quotaDiff,
      );
      if (!!quotaDiff) {
        contribution =
          (quotas - mostRecentPreviousRecord.quotas) * currentQuotaValue;
      }
      variation =
        quotas * currentQuotaValue -
        mostRecentPreviousRecord.currentValue -
        contribution;
      variationPercent = variation / mostRecentPreviousRecord.currentValue;
    }

    const category = data.category ?? 'stocks';
    const currentTime = new Date(Date.now());

    return {
      stock: stock,
      day: day,
      contribution: contribution,
      quotas: quotas,
      currentQuotaValue: currentQuotaValue,
      currentValue: quotas * currentQuotaValue,
      meanQuotaValue: meanQuotaValue,
      investedValue: quotas * meanQuotaValue,
      variation: variation,
      variationPercent: variationPercent,
      category: category,
      createdAt: currentTime.toISOString(),
      updatedAt: currentTime.toISOString(),
    };
  }

  private static updateMeanQuotaValue(
    previousMeanQuota: number,
    previousQuotas: number,
    currentQuotaValue: number,
    currentQuotas: number,
  ) {
    return (
      (previousMeanQuota * previousQuotas + currentQuotaValue * currentQuotas) /
      (previousQuotas + currentQuotas)
    );
  }
}
