import { Injectable } from '@nestjs/common';
import { StocksRepository } from './stocks.repository';
import { Stock } from './stocks.models';
import { ErrorsService } from '../core/errors/errors.service';
import { StocksErrors } from './stocks.errors';
import { StocksMapper } from './stocks.mapper';

@Injectable()
export class StocksService {
  constructor(
    private stocksRepository: StocksRepository,
    private stocksMapper: StocksMapper,
  ) {}

  public async addStockRecord(data: Stock) {
    ErrorsService.validateCondition(
      !(await this.validateIfRecordExists(data.stock, data.day)),
      StocksErrors.EST001,
    );

    const stockRecordData = await this.determineStockRecordData(data);

    return this.stocksRepository.saveStock(
      this.stocksMapper.fromEntityToPersistence(stockRecordData),
    );
  }

  public async deleteStockRecords(
    stockName: string,
    startDate: Date,
    endDate?: Date,
  ): Promise<any> {
    let deletedRecords;
    if (!endDate) {
      deletedRecords = await this.stocksRepository.deleteStockRecordByDate(
        stockName,
        startDate,
      );
    } else {
      deletedRecords =
        await this.stocksRepository.deleteStockRecordsByDateInterval(
          stockName,
          startDate,
          endDate,
        );
    }

    ErrorsService.validateCondition(
      deletedRecords.count !== 0,
      StocksErrors.EST002,
    );

    return deletedRecords;
  }

  private async determineStockRecordData(stockRecord: Stock) {
    const mostRecentPreviousRecord =
      await this.stocksRepository.getPreviousStockRecordsFromDate(
        stockRecord.stock,
        stockRecord.day,
      );

    if (!mostRecentPreviousRecord) {
      return this.determineStockRecordDataWithNoPreviousRecords(stockRecord);
    }

    return this.determineStockRecordDataWithPreviousRecords(
      stockRecord,
      mostRecentPreviousRecord,
    );
  }

  private determineStockRecordDataWithNoPreviousRecords(stockRecord: Stock) {
    const currentValue = stockRecord.quotas * stockRecord.currentQuotaValue;
    return {
      ...stockRecord,
      currentValue,
      investedValue: currentValue,
      contribution: currentValue,
      meanQuotaValue: stockRecord.currentQuotaValue,
    };
  }

  private determineStockRecordDataWithPreviousRecords(
    stockRecord: Stock,
    previousRecord: Stock,
  ) {
    const { quotas, currentQuotaValue } = stockRecord;

    const quotaDiff = quotas - previousRecord.quotas;
    const contribution = quotaDiff
      ? (quotas - previousRecord.quotas) * currentQuotaValue
      : 0;

    const meanQuotaValue = StocksService.calculateMeanQuotaValue(
      previousRecord.meanQuotaValue,
      previousRecord.quotas,
      currentQuotaValue,
      quotaDiff,
    );

    const dailyVariation =
      quotas * currentQuotaValue - previousRecord.currentValue - contribution;

    const dailyVariationPercent = dailyVariation / previousRecord.currentValue;

    const variation = quotas * currentQuotaValue - quotas * meanQuotaValue;
    const variationPercent = variation / (quotas * meanQuotaValue);

    return {
      ...stockRecord,
      contribution,
      meanQuotaValue,
      dailyVariation,
      dailyVariationPercent,
      variation,
      variationPercent,
    };
  }

  private async validateIfRecordExists(
    stock: string,
    day: Date,
  ): Promise<boolean> {
    const record = await this.stocksRepository.getStockRecordByNameAndDate(
      stock,
      day,
    );

    return !!record;
  }

  private static calculateMeanQuotaValue(
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
