import { Injectable } from '@nestjs/common';
import { StocksRepository } from './stocks.repository';
import {
  RegisterStockRequestDto,
  StocksRegisterEntity,
  StocksRegisterResponseDto,
} from './stocks.models';
import { ErrorsService } from '../core/errors/errors.service';
import { StocksErrors } from './stocks.errors';

@Injectable()
export class StocksService {
  constructor(private stocksRepository: StocksRepository) {}

  public async addStockRecord(
    data: RegisterStockRequestDto,
  ): Promise<StocksRegisterResponseDto> {
    ErrorsService.validateCondition(
      !(await this.validateIfRecordExists(data.stock, data.day)),
      StocksErrors.EST001,
    );

    const stockRecordData = await this.determineStockRecordData(data);

    await this.stocksRepository.saveStock(stockRecordData);

    return StocksService.formatStockRecordDataResponse(stockRecordData);
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

  private async determineStockRecordData(data: RegisterStockRequestDto) {
    const { stock, day, quotas } = data;
    const currentQuotaValue = data.current_quota_value;
    let meanQuotaValue: number;
    let dailyVariation: number;
    let dailyVariationPercent: number;
    let variation: number;
    let variationPercent: number;
    let contribution = 0;

    const mostRecentPreviousRecord =
      await this.stocksRepository.getPreviousStockRecordsFromDate(stock, day);

    if (!mostRecentPreviousRecord) {
      meanQuotaValue = currentQuotaValue;
      dailyVariation = 0;
      dailyVariationPercent = 0;
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
      dailyVariation =
        quotas * currentQuotaValue -
        mostRecentPreviousRecord.currentValue -
        contribution;
      dailyVariationPercent =
        dailyVariation / mostRecentPreviousRecord.currentValue;
      variation = quotas * currentQuotaValue - quotas * meanQuotaValue;
      variationPercent = variation / (quotas * meanQuotaValue);
    }

    const category = data.category ?? 'stocks';
    const currentTime = new Date(Date.now());

    return {
      stock: stock.toUpperCase(),
      day: day,
      contribution: contribution,
      quotas: quotas,
      currentQuotaValue: currentQuotaValue,
      currentValue: quotas * currentQuotaValue,
      meanQuotaValue: meanQuotaValue,
      investedValue: quotas * meanQuotaValue,
      dailyVariation: dailyVariation,
      dailyVariationPercent: dailyVariationPercent,
      variation: variation,
      variationPercent: variationPercent,
      category: category,
      createdAt: currentTime.toISOString(),
      updatedAt: currentTime.toISOString(),
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

  private static formatStockRecordDataResponse(
    data: StocksRegisterEntity,
  ): StocksRegisterResponseDto {
    return {
      stock: data.stock,
      category: data.category,
      day: data.day.toISOString().split('T')[0],
      quotas: data.quotas,
      current_quota_value: data.currentQuotaValue,
      mean_quota_value: data.meanQuotaValue,
      contribution: data.contribution,
      current_value: data.currentValue,
      invested_value: data.investedValue,
      daily_variation: data.dailyVariation,
      daily_variation_percent: data.dailyVariationPercent,
      variation: data.variation,
      variation_percent: data.variationPercent,
    };
  }
}
