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
}
