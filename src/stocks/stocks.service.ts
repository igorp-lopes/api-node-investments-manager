import { Injectable } from '@nestjs/common';
import { StocksRepository } from './stocks.repository';
import { RegisterStockDto, StocksRegisterInfoDto } from './stocks.models';
import { Prisma } from '@prisma/client';

@Injectable()
export class StocksService {
  constructor(private stocksRepository: StocksRepository) {}

  public async addStockRecord(
    data: RegisterStockDto,
  ): Promise<StocksRegisterInfoDto> {
    const stockInfo = StocksService.createStockRecord(data);

    const createdStock = await this.stocksRepository.saveStock(stockInfo);

    return createdStock as StocksRegisterInfoDto;
  }

  private static createStockRecord(
    data: RegisterStockDto,
  ): Prisma.StocksCreateInput {
    const { stock, day, contribution, quotas } = data;
    const currentQuotaValue = data.current_quota_value;

    const meanQuotaValue = currentQuotaValue;
    const variation = 0;
    const variationPercent = 0;

    const currentDate = new Date(Date.now());

    return {
      stock,
      day,
      contribution,
      quotas,
      currentQuotaValue,
      currentValue: quotas * currentQuotaValue,
      meanQuotaValue,
      investedValue: quotas * meanQuotaValue,
      variation,
      variationPercent,
      createdAt: currentDate.toISOString(),
      updatedAt: currentDate.toISOString(),
    };

    // export type Stocks = {
    //   id: number
    //   stock: string
    //   day: Date
    //   investedValue: number
    //   currentValue: number
    //   contribution: number
    //   quotas: number
    //   currentQuotaValue: number
    //   meanQuotaValue: number
    //   variation: number
    //   variationPercent: number
    //   createdAt: Date
    //   updatedAt: Date
    // }
  }
}
