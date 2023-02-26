import { Prisma, Stocks } from '@prisma/client';
import { Stock, StockClientEntity } from '../../src/stocks/stocks.models';
import { RegisterStockRequest } from '../../src/stocks/stocks.schemas';
import { v4 as uuidv4 } from 'uuid';

export const stockRepositoryResponse = {
  id: uuidv4(),
  stock: 'TESTSTOCK1',
  category: 'international',
  date: new Date('2022-02-18'),
  quotas: 55,
  currentQuotaValue: 130,
  meanQuotaValue: 130,
  contribution: 7150,
  currentValue: 7150,
  investedValue: 7150,
  dailyVariation: 0,
  dailyVariationPercent: 0,
  variation: 0,
  variationPercent: 0,
};

export const testRegisterStockRequest1: RegisterStockRequest = {
  stock: 'testStock1',
  date: new Date('2022-02-18'),
  quotas: 55,
  current_quota_value: 130,
  contribution: 7150,
  category: 'international',
};

export const testMappedStock1: Stock = {
  id: uuidv4(),
  stock: 'testStock1',
  date: new Date('2022-02-18'),
  contribution: 7150,
  quotas: 55,
  currentQuotaValue: 130,
  category: 'international',
  currentValue: 0,
  meanQuotaValue: 0,
  investedValue: 0,
  dailyVariation: 0,
  dailyVariationPercent: 0,
  variation: 0,
  variationPercent: 0,
};
export const testMappedStock2: Stock = {
  id: uuidv4(),
  stock: 'testStock1',
  date: new Date('2022-02-19'),
  quotas: 60,
  currentQuotaValue: 135,
  contribution: 675,
  category: 'international',
  currentValue: 0,
  meanQuotaValue: 0,
  investedValue: 0,
  dailyVariation: 0,
  dailyVariationPercent: 0,
  variation: 0,
  variationPercent: 0,
};

export const testStockRecord1: Stocks = {
  id: uuidv4(),
  stock: 'TESTSTOCK1',
  category: 'international',
  date: new Date('2022-02-18'),
  quotas: 55,
  currentQuotaValue: 130,
  meanQuotaValue: 130,
  contribution: 7150,
  currentValue: 7150,
  investedValue: 7150,
  dailyVariation: 0,
  dailyVariationPercent: 0,
  variation: 0,
  variationPercent: 0,
  createdAt: new Date('2022-03-18T00:47:19.292Z'),
  updatedAt: new Date('2022-03-18T00:47:19.292Z'),
};

export const testRegisterStockResponse1: StockClientEntity = {
  stock: 'TESTSTOCK1',
  category: 'international',
  date: '2022-02-18',
  quotas: 55,
  current_quota_value: 130,
  mean_quota_value: 130,
  contribution: 7150,
  current_value: 7150,
  invested_value: 7150,
  daily_variation: 0,
  daily_variation_percent: 0,
  variation: 0,
  variation_percent: 0,
};

export const testRegisterStockRequest2: RegisterStockRequest = {
  stock: 'testStock1',
  date: new Date('2022-02-19'),
  quotas: 60,
  current_quota_value: 135,
  contribution: 675,
  category: 'international',
};

export const testStockRecord2: Stocks = {
  id: uuidv4(),
  stock: 'TESTSTOCK1',
  category: 'international',
  date: new Date('2022-02-19'),
  quotas: 60,
  currentQuotaValue: 135,
  meanQuotaValue: 130.416,
  contribution: 675,
  currentValue: 8100,
  investedValue: 7824.999999999999,
  dailyVariation: 275,
  dailyVariationPercent: 0.038461538461538464,
  variation: 275.0000000000009,
  variationPercent: 0.03514376996805124,
  createdAt: new Date('2022-03-19T00:47:19.292Z'),
  updatedAt: new Date('2022-03-19T00:47:19.292Z'),
};

export const testRegisterStockResponse2: StockClientEntity = {
  stock: 'TESTSTOCK1',
  category: 'international',
  date: '2022-02-19',
  quotas: 60,
  current_quota_value: 135,
  mean_quota_value: 130.416,
  contribution: 675,
  current_value: 8100,
  invested_value: 7824.999999999999,
  daily_variation: 275,
  daily_variation_percent: 0.038461538461538464,
  variation: 275.0000000000009,
  variation_percent: 0.0351437699680512,
};

export const testStockWithoutPreviousRecordRequest = {
  stock: 'stockWithNoRecord',
  day: '2022-04-01',
  quotas: 10,
  current_quota_value: 55.5,
};

export const testStockWithoutPreviousRecord: Prisma.StocksCreateInput = {
  stock: 'STOCKWITHNORECORD',
  date: '2022-04-01T00:00:00.000Z',
  contribution: 555,
  quotas: 10,
  currentQuotaValue: 55.5,
  currentValue: 555,
  meanQuotaValue: 55.5,
  investedValue: 555,
  dailyVariation: 0,
  dailyVariationPercent: 0,
  variation: 0,
  variationPercent: 0,
  category: 'stocks',
  createdAt: '2022-04-03T17:33:47.202Z',
  updatedAt: '2022-04-03T17:33:47.202Z',
};

export const testStockWithoutPreviousRecordResponse: StockClientEntity = {
  stock: 'STOCKWITHNORECORD',
  category: 'stocks',
  date: '2022-04-01',
  quotas: 10,
  current_quota_value: 55.5,
  mean_quota_value: 55.5,
  contribution: 555,
  current_value: 555,
  invested_value: 555,
  daily_variation: 0,
  daily_variation_percent: 0,
  variation: 0,
  variation_percent: 0,
};

export const testStockWithPreviousRecordRequest = {
  stock: 'stockWithRecord',
  day: '2022-04-02',
  quotas: 15,
  current_quota_value: 50,
};

export const testStockWithPreviousRecord: Prisma.StocksCreateInput = {
  stock: 'STOCKWITHRECORD',
  date: '2022-04-01T00:00:00.000Z',
  contribution: 555,
  quotas: 10,
  currentQuotaValue: 55.5,
  currentValue: 555,
  meanQuotaValue: 55.5,
  investedValue: 555,
  dailyVariation: 0,
  dailyVariationPercent: 0,
  variation: 0,
  variationPercent: 0,
  category: 'stocks',
  createdAt: '2022-04-03T17:33:47.202Z',
  updatedAt: '2022-04-03T17:33:47.202Z',
};

export const testStockWithPreviousRecordResponse: StockClientEntity = {
  stock: 'STOCKWITHRECORD',
  category: 'stocks',
  date: '2022-04-02',
  quotas: 15,
  current_quota_value: 50,
  mean_quota_value: 53.666666666666664,
  contribution: 250,
  current_value: 750,
  invested_value: 805,
  daily_variation: -55,
  daily_variation_percent: -0.0990990990990991,
  variation: -55,
  variation_percent: -0.06832298136645963,
};

export const testStockWithRepeatedRecordRequest = {
  stock: 'stockWithRecord',
  day: '2022-04-02',
  quotas: 15,
  current_quota_value: 50,
};
