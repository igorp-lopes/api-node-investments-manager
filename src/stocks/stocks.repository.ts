import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { Stocks, Prisma } from '@prisma/client';

@Injectable()
export class StocksRepository {
  constructor(private prisma: PrismaService) {}

  public async saveStock(data: Prisma.StocksCreateInput): Promise<Stocks> {
    return this.prisma.stocks.create({ data });
  }

  public async deleteStockRecordByDate(
    stockName: string,
    date: Date,
  ): Promise<any> {
    return this.prisma.stocks.deleteMany({
      where: { stock: stockName, day: date },
    });
  }

  public async deleteStockRecordsByDateInterval(
    stockName: string,
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    return this.prisma.stocks.deleteMany({
      where: { stock: stockName, day: { gte: startDate, lte: endDate } },
    });
  }

  public async getPreviousStockRecordsFromDate(
    stockName: string,
    date: Date,
  ): Promise<any> {
    return this.prisma.stocks.findFirst({
      where: {
        day: { lte: date },
      },
      orderBy: {
        day: 'desc',
      },
    });
  }
}
