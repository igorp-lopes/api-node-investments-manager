import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { Reits, Prisma } from '@prisma/client';

@Injectable()
export class ReitsRepository {
  constructor(private prisma: PrismaService) {}

  public async saveReits(data: Prisma.ReitsCreateInput): Promise<Reits> {
    return this.prisma.reits.create({ data });
  }

  public async testSaveReits() {
    const data = {
      reit: 'TESTREIT',
      date: '2022-05-16',
      investedValue: 1,
      currentValue: 1,
      contribution: 1,
      quotas: 1,
      currentQuotaValue: 1,
      meanQuotaValue: 1,
      dailyVariation: 0,
      dailyVariationPercent: 0,
      variation: 0,
      variationPercent: 0,
      dividends: 0,
      totalDividends: 0,
      category: 'test',
      createdAt: '2022-05-16 01:40:16.349000000',
      updatedAt: '2022-05-16 01:40:16.349000000',
    };
    return this.prisma.reits.create({ data });
  }
}
