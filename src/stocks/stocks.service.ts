import { Injectable } from '@nestjs/common';
import { StocksRepository } from './stocks.repository';
import { Stock } from './stocks.models';
import { ErrorsService } from '../core/errors/errors.service';
import { StocksErrors } from './stocks.errors';
import { StocksMapper } from './stocks.mapper';
import { calculateMeanQuotaValue } from '../helpers/financeHelpers';

@Injectable()
export class StocksService {
  constructor(
    private stocksRepository: StocksRepository,
    private stocksMapper: StocksMapper,
  ) {}

  public async addStockRecord(data: Stock) {
    ErrorsService.validateCondition(
      !(await this.validateIfRecordExists(data.stock, data.date)),
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
        stockRecord.date,
      );

    if (mostRecentPreviousRecord) {
      return this.determineStockRecordDataWithPreviousRecords(
        stockRecord,
        mostRecentPreviousRecord,
      );
    }

    return this.determineStockRecordDataWithNoPreviousRecords(stockRecord);
  }

  private determineStockRecordDataWithNoPreviousRecords(
    stockRecord: Stock,
  ): Stock {
    return {
      ...stockRecord,
      investedValue: stockRecord.currentValue,
      meanQuotaValue: stockRecord.currentQuotaValue,
    };
  }

  private determineStockRecordDataWithPreviousRecords(
    stockRecord: Stock,
    previousRecord: Stock,
  ) {
    const quotaDiff = stockRecord.quotas - previousRecord.quotas;

    const meanQuotaValue = calculateMeanQuotaValue(
      previousRecord.meanQuotaValue,
      previousRecord.quotas,
      stockRecord.currentQuotaValue,
      quotaDiff,
    );

    const investedValue = stockRecord.quotas * meanQuotaValue;

    const variation = stockRecord.currentValue - investedValue;
    const variationPercent = variation / investedValue;

    return {
      ...stockRecord,
      meanQuotaValue,
      variation,
      variationPercent,
      investedValue,
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
}
