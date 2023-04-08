import { Stocks } from '@prisma/client';
import { Stock } from '../../src/stocks/stocks.models';
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
