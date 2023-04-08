export type Stock = {
  id: string;
  stock: string;
  date: Date;
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
};

export type StockClientEntity = {
  stock: string;
  date: string;
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
};

export type StockPersistenceEntity = {
  id: string;
  stock: string;
  date: Date;
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
