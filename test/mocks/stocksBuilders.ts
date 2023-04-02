import { RegisterStockRequest } from '../../src/stocks/stocks.schemas';
import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import { StockClientEntity } from '../../src/stocks/stocks.models';
import { generateFakerDate } from '../utils/generalTestUtils';

export class StocksRequestBuilder {
  createStockRecordRequest(): RegisterStockRequest {
    return this.buildStockRecordRequest();
  }

  createStockRecordRequestFromPreviousRecordRequest(
    previousRequest: Partial<RegisterStockRequest>,
  ): RegisterStockRequest {
    const date = generateFakerDate(faker.date.soon(2, previousRequest.date));
    const quotas = faker.datatype.number({
      min: previousRequest.quotas + 1,
      max: previousRequest.quotas * 3,
    });
    const currentQuotaValue = faker.datatype.float({
      min: previousRequest.current_quota_value + 1,
      max: previousRequest.current_quota_value * 3,
    });

    return this.buildStockRecordRequest({
      stock: previousRequest.stock,
      date,
      quotas,
      current_quota_value: currentQuotaValue,
      category: previousRequest.category,
    });
  }
  private buildStockRecordRequest(
    requestParams?: Partial<RegisterStockRequest>,
  ): RegisterStockRequest {
    const numberMinMaxLimits = { min: 1, max: 1000 };

    return {
      stock: requestParams?.stock ?? faker.word.noun(),
      date: requestParams?.date ?? generateFakerDate(faker.date.soon()),
      quotas:
        requestParams?.quotas ?? faker.datatype.number(numberMinMaxLimits),
      current_quota_value:
        requestParams?.current_quota_value ??
        faker.datatype.float(numberMinMaxLimits),
      category: requestParams?.category ?? faker.word.noun(),
    };
  }
}

export class StocksResponseBuilder {
  createStockRecordWithoutPreviousRecordResponseFromRequest(
    request: RegisterStockRequest,
  ): StockClientEntity {
    return this.buildStockRecordResponse({
      stock: request.stock,
      date: request.date.toISOString().split('T')[0],
      quotas: request.quotas,
      current_quota_value: request.current_quota_value,
      mean_quota_value: request.current_quota_value,
      category: request.category,
      daily_variation: 0,
      daily_variation_percent: 0,
      contribution: request.quotas * request.current_quota_value,
    });
  }

  createStockRecordResponseFromRequest(
    request: RegisterStockRequest,
  ): StockClientEntity {
    return this.buildStockRecordResponse({
      stock: request.stock,
      date: request.date.toISOString().split('T')[0],
      quotas: request.quotas,
      current_quota_value: request.current_quota_value,
      category: request.category,
    });
  }

  private buildStockRecordResponse(
    responseParams?: Partial<StockClientEntity>,
  ): StockClientEntity {
    const numberMinMaxLimits = { min: 1, max: 1000 };
    const date =
      responseParams.date ??
      generateFakerDate(faker.date.soon()).toISOString().split('T')[0];

    const quotas =
      responseParams.quotas ?? faker.datatype.number(numberMinMaxLimits);

    const meanQuotaValue =
      responseParams.mean_quota_value ??
      faker.datatype.float(numberMinMaxLimits);

    const investedValue = meanQuotaValue * quotas;

    const currentQuotaValue =
      responseParams.current_quota_value ??
      faker.datatype.float(numberMinMaxLimits);

    const currentValue = currentQuotaValue * quotas;

    const stock = responseParams.stock ?? faker.word.noun();

    return {
      date,
      quotas,
      current_quota_value: currentQuotaValue,
      current_value: currentValue,
      mean_quota_value: meanQuotaValue,
      invested_value: investedValue,
      variation: currentValue - investedValue,
      variation_percent: currentValue / investedValue - 1,
      stock: stock.toUpperCase(),
      contribution:
        responseParams.contribution ?? faker.datatype.float(numberMinMaxLimits),
      daily_variation:
        responseParams.daily_variation ??
        faker.datatype.float(numberMinMaxLimits),
      daily_variation_percent:
        responseParams.daily_variation_percent ??
        faker.datatype.float({ min: 0, max: 2 }),
      category: responseParams.category,
    };
  }
}

export class StocksDbBuilder {
  createDbStockWithoutPreviousRecordFromStockRequest(
    stockRequest: Partial<RegisterStockRequest>,
  ): Prisma.StocksCreateInput {
    const {
      stock,
      date,
      quotas,
      current_quota_value: currentQuotaValue,
      category,
    } = stockRequest;

    return this.buildDbStock({
      stock,
      date,
      quotas,
      currentQuotaValue,
      meanQuotaValue: currentQuotaValue,
      category,
    });
  }
  private buildDbStock(
    dbStockParams?: Partial<Prisma.StocksCreateInput>,
  ): Prisma.StocksCreateInput {
    const floatMinMaxLimits = { min: 1, max: 1000 };

    const currentDate = new Date();
    const quotas =
      dbStockParams.quotas ?? faker.datatype.float(floatMinMaxLimits);
    const currentQuotaValue =
      dbStockParams.currentQuotaValue ??
      faker.datatype.float(floatMinMaxLimits);
    const currentValue = currentQuotaValue * quotas;
    const meanQuotaValue =
      dbStockParams.meanQuotaValue ?? faker.datatype.float(floatMinMaxLimits);
    const investedValue = meanQuotaValue * quotas;

    const stock = dbStockParams.stock ?? faker.word.noun();

    return {
      stock: stock.toUpperCase(),
      date: dbStockParams.date ?? generateFakerDate(faker.date.soon()),
      createdAt: dbStockParams.createdAt ?? currentDate,
      updatedAt: dbStockParams.updatedAt ?? currentDate,
      currentQuotaValue,
      quotas,
      currentValue,
      contribution: dbStockParams.contribution ?? currentValue,
      meanQuotaValue,
      investedValue,
      dailyVariation: dbStockParams.dailyVariation ?? 0,
      dailyVariationPercent: dbStockParams.dailyVariationPercent ?? 0,
      variation: currentValue - investedValue,
      variationPercent: currentValue / investedValue - 1,
      category: dbStockParams.category ?? faker.word.noun(),
    };
  }
}
