export type Stock = {
  id: string;
  stock: string;
  date: Date;
  investedValue: number;
  currentValue: number;
  quotas: number;
  currentQuotaValue: number;
  meanQuotaValue: number;
  variation: number;
  variationPercent: number;
  category: string;
};

export type StockClientEntity = {
  stock: string;
  date: string;
  quotas: number;
  current_quota_value: number;
  current_value: number;
  mean_quota_value: number;
  invested_value: number;
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
  quotas: number;
  currentQuotaValue: number;
  meanQuotaValue: number;
  variation: number;
  variationPercent: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
};
