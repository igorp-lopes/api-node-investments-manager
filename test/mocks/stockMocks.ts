import { Stocks } from '@prisma/client';
import {
  RegisterStockRequestDto,
  StocksRegisterResponseDto,
} from '../../src/stocks/stocks.models';

export const testRegisterStockRequest: RegisterStockRequestDto = {
  stock: 'testStock1',
  day: new Date('2022-02-18'),
  quotas: 55,
  current_quota_value: 130,
  contribution: 7150,
  category: 'international',
};

export const testStockRecord1: Stocks = {
  id: 1,
  stock: 'testStock1',
  category: 'international',
  day: new Date('2022-02-18'),
  quotas: 55,
  currentQuotaValue: 130,
  meanQuotaValue: 130,
  contribution: 7150,
  currentValue: 130,
  investedValue: 130,
  dailyVariation: 0,
  dailyVariationPercent: 0,
  variation: 0,
  variationPercent: 0,
  createdAt: new Date('2022-03-17T00:47:19.292Z'),
  updatedAt: new Date('2022-03-17T00:47:19.292Z'),
};

export const testRegisterStockResponse1: StocksRegisterResponseDto = {
  stock: 'testStock1',
  category: 'international',
  day: '2022-02-18',
  quotas: 55,
  current_quota_value: 130,
  mean_quota_value: 130,
  contribution: 7150,
  current_value: 130,
  invested_value: 130,
  daily_variation: 0,
  daily_variation_percent: 0,
  variation: 0,
  variation_percent: 0,
};
