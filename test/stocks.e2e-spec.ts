import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StocksModule } from '../src/stocks/stocks.module';
import { PrismaService } from '../src/core/prisma.service';
import { cleanupDatabase, setupGlobalModules } from './testUtils';

describe('Stocks End-to-End Tests', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [StocksModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupGlobalModules(app);

    prisma = app.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    await cleanupDatabase(prisma);
  });
});

const createStockRecordDTO = (
  name,
  day,
  quotas,
  currentQuotaValue,
  category?,
) => {
  return {
    stock: name,
    day,
    quotas,
    current_quota_value: currentQuotaValue,
    category: category ?? 'stocks',
  };
};
