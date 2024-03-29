import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { Prisma } from '@prisma/client';
import { StocksMapper } from './stocks.mapper';

@Injectable()
export class StocksRepository {
  constructor(
    private prisma: PrismaService,
    private stocksMapper: StocksMapper,
  ) {}

  public async saveStock(data: Prisma.StocksCreateInput) {
    const savedStock = await this.prisma.stocks.create({ data });
    return this.stocksMapper.fromPersistenceToEntity(savedStock);
  }

  public async deleteStockRecordByDate(stockName: string, date: Date) {
    return this.prisma.stocks.deleteMany({
      where: { stock: stockName, date: date },
    });
  }

  public async deleteStockRecordsByDateInterval(
    stockName: string,
    startDate: Date,
    endDate: Date,
  ) {
    return this.prisma.stocks.deleteMany({
      where: { stock: stockName, date: { gte: startDate, lte: endDate } },
    });
  }

  public async getStockRecordByNameAndDate(stockName: string, date: Date) {
    const stock = await this.prisma.stocks.findFirst({
      where: { stock: stockName, date: date },
    });
    return stock && this.stocksMapper.fromPersistenceToEntity(stock);
  }

  public async getPreviousStockRecordsFromDate(stockName: string, date: Date) {
    const stock = await this.prisma.stocks.findFirst({
      where: {
        stock: stockName,
        date: { lte: date },
      },
      orderBy: {
        date: 'desc',
      },
    });
    return stock && this.stocksMapper.fromPersistenceToEntity(stock);
  }
}
