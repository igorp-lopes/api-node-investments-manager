import { Prisma } from '@prisma/client';
import { PrismaService } from '../../src/core/prisma.service';

export const seedStockWithPreviousRecord: Prisma.StocksCreateInput = {
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

export const seedStockWithRepeatedRecord: Prisma.StocksCreateInput = {
  stock: 'STOCKWITHREPEATEDRECORD',
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

export const seedStockRecordsToBeDeleted: Prisma.StocksCreateInput[] = [
  {
    stock: 'STOCKTOBEDELETED',
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
  },
  {
    stock: 'STOCKTOBEDELETED',
    date: '2022-04-02T00:00:00.000Z',
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
  },
  {
    stock: 'STOCKTOBEDELETED',
    date: '2022-04-03T00:00:00.000Z',
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
  },
];

export async function setupStocksDatabase(prisma: PrismaService) {
  await addManyStockRecords(
    prisma,
    [
      seedStockWithPreviousRecord,
      seedStockWithRepeatedRecord,
      seedStockRecordsToBeDeleted,
    ].flat(),
  );

  await prisma.$disconnect();
}

export async function addManyStockRecords(
  prisma: PrismaService,
  records: Prisma.StocksCreateInput[],
) {
  await prisma.stocks.createMany({
    data: records,
  });
}
