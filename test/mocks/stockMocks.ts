const currentTime = new Date(Date.now());

export const testRegisterStockRequest = {
  stock: 'testStock',
  day: new Date('2022-02-18'),
  quotas: 55,
  current_quota_value: 130,
  contribution: 0,
  category: 'international',
};

export const testStockRecord1 = {
  id: 1,
  stock: 'testStock1',
  category: 'stocks',
  day: '2022-02-18',
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
  createdAt: currentTime.toISOString(),
  updatedAt: currentTime.toISOString(),
};
