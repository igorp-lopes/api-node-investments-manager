import { RegisterStockRequest } from '../../src/stocks/stocks.schemas';
import { faker } from '@faker-js/faker';
import { Stock } from '../../src/stocks/stocks.models';
import { addDaysToDate, generateFakerDate } from '../utils/generalTestUtils';
import { v4 as uuidv4 } from 'uuid';
import { calculateMeanQuotaValue } from '../../src/helpers/financeHelpers';

const NUMBER_MIN_MAX_LIMITS = { min: 1, max: 1000 };
const FLOAT_MIN_MAX_LIMITS = { min: 1, max: 1000, precision: 0.01 };
export class StockRecordsBuilder {
  public createStockRecordWithoutPreviousRecord(): Stock {
    const quotas = faker.datatype.number(NUMBER_MIN_MAX_LIMITS);
    const currentQuotaValue = faker.datatype.float(FLOAT_MIN_MAX_LIMITS);
    const contribution = quotas * currentQuotaValue;

    return this.buildStockRecord({
      quotas,
      currentQuotaValue,
      contribution: parseFloat(contribution.toFixed(2)),
      meanQuotaValue: currentQuotaValue,
      dailyVariation: 0,
      dailyVariationPercent: 0,
    });
  }

  public createStockRecordFromPreviousRecord(previousRecord: Stock): Stock {
    const date = generateFakerDate(addDaysToDate(previousRecord.date));
    const quotas = faker.datatype.number({
      min: previousRecord.quotas + 1,
      max: previousRecord.quotas * 3,
    });
    const currentQuotaValue = faker.datatype.float({
      min: previousRecord.currentQuotaValue + 1,
      max: previousRecord.currentQuotaValue * 3,
      precision: 0.01,
    });

    const quotaDiff = quotas - previousRecord.quotas;
    const contribution = quotaDiff * currentQuotaValue;

    const meanQuotaValue = calculateMeanQuotaValue(
      previousRecord.meanQuotaValue,
      previousRecord.quotas,
      currentQuotaValue,
      quotaDiff,
    );

    const dailyVariation =
      quotas * currentQuotaValue - previousRecord.currentValue - contribution;

    const dailyVariationPercent = dailyVariation / previousRecord.currentValue;

    return this.buildStockRecord({
      stock: previousRecord.stock,
      date,
      quotas,
      currentQuotaValue,
      contribution: parseFloat(contribution.toFixed(2)),
      meanQuotaValue: parseFloat(meanQuotaValue.toFixed(2)),
      dailyVariation: parseFloat(dailyVariation.toFixed(2)),
      dailyVariationPercent: parseFloat(dailyVariationPercent.toFixed(2)),
    });
  }
  private buildStockRecord(stocksParams?: Partial<Stock>): Stock {
    const quotas =
      stocksParams.quotas ?? faker.datatype.number(NUMBER_MIN_MAX_LIMITS);

    const meanQuotaValue =
      stocksParams.meanQuotaValue ?? faker.datatype.float(FLOAT_MIN_MAX_LIMITS);

    const investedValue = meanQuotaValue * quotas;

    const currentQuotaValue =
      stocksParams.currentQuotaValue ??
      faker.datatype.float(FLOAT_MIN_MAX_LIMITS);

    const currentValue = currentQuotaValue * quotas;

    const variation = currentValue - investedValue;
    const variationPercent = currentValue / investedValue - 1;

    const stock = stocksParams.stock ?? faker.helpers.unique(faker.word.noun);

    return {
      stock: stock.toUpperCase(),
      date: stocksParams.date ?? generateFakerDate(faker.date.soon()),
      contribution:
        stocksParams.contribution ??
        faker.datatype.float(NUMBER_MIN_MAX_LIMITS),
      category: stocksParams.category ?? faker.word.noun(),
      dailyVariation: stocksParams.dailyVariation ?? 0,
      dailyVariationPercent: stocksParams.dailyVariationPercent ?? 0,
      variation: parseFloat(variation.toFixed(2)),
      variationPercent: parseFloat(variationPercent.toFixed(2)),
      quotas,
      currentQuotaValue: parseFloat(currentQuotaValue.toFixed(2)),
      currentValue: parseFloat(currentValue.toFixed(2)),
      meanQuotaValue: parseFloat(meanQuotaValue.toFixed(2)),
      investedValue: parseFloat(investedValue.toFixed(2)),
      id: uuidv4(),
    };
  }
}

export class StocksRequestBuilder {
  public createStockRecordRequestFromStockEntity(
    entity: Stock,
  ): RegisterStockRequest {
    return this.buildStockRecordRequest({
      stock: entity.stock,
      category: entity.category,
      date: entity.date,
      quotas: entity.quotas,
      current_quota_value: entity.currentQuotaValue,
    });
  }
  private buildStockRecordRequest(
    requestParams?: Partial<RegisterStockRequest>,
  ): RegisterStockRequest {
    return {
      stock: requestParams?.stock ?? faker.word.noun(),
      date: requestParams?.date ?? generateFakerDate(faker.date.soon()),
      quotas:
        requestParams?.quotas ?? faker.datatype.number(NUMBER_MIN_MAX_LIMITS),
      current_quota_value:
        requestParams?.current_quota_value ??
        faker.datatype.float(NUMBER_MIN_MAX_LIMITS),
      category: requestParams?.category ?? faker.word.noun(),
    };
  }
}
