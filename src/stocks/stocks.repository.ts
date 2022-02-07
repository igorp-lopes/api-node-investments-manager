import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { Stocks, Prisma } from '@prisma/client';

@Injectable()
export class StocksRepository {
  constructor(private prisma: PrismaService) {}

  public async saveStock(data: Prisma.StocksCreateInput): Promise<Stocks> {
    return this.prisma.stocks.create({ data });
  }
}
