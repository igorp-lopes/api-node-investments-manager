import { RegisterStockRequestSchema } from './stocks.schemas';

export type StocksRegisterEntity = Omit<
  Stocks,
  'id' | 'createdAt' | 'updatedAt'
>;

export type Stocks = {
  id: number;
  stock: string;
  day: Date;
  investedValue: number;
  currentValue: number;
  contribution: number;
  quotas: number;
  currentQuotaValue: number;
  meanQuotaValue: number;
  dailyVariation: number;
  dailyVariationPercent: number;
  variation: number;
  variationPercent: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface StocksRegisterResponseDto {
  stock: string;
  day: string;
  contribution: number;
  quotas: number;
  current_quota_value: number;
  current_value: number;
  mean_quota_value: number;
  invested_value: number;
  daily_variation: number;
  daily_variation_percent: number;
  variation: number;
  variation_percent: number;
  category: string;
}

export function mapStockRegisterRequestToModel(
  request: RegisterStockRequestSchema,
) {
  return {
    stock: request,
    day: request.day,
    contribution: request.contribution,
    quotas: request.quotas,
    currentQuotaValue: request.current_quota_value,
    category: request.category,
  };
}

export function mapStockModelToResponseDto(record: StocksRegisterEntity) {
  return {
    stock: record.stock,
    day: record.day,
    contribution: record.contribution,
    quotas: record.quotas,
    current_quota_value: record.currentQuotaValue,
    current_value: record.currentValue,
    mean_quota_value: record.meanQuotaValue,
    invested_value: record.investedValue,
    daily_variation: record.dailyVariation,
    daily_variation_percent: record.dailyVariationPercent,
    variation: record.variation,
    variation_percent: record.variationPercent,
    category: record.category,
  };
}
