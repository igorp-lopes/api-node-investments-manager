import { Injectable } from '@nestjs/common';
import {
  Stocks,
  StocksClientEntity,
  StocksPersistenceEntity,
} from './stocks.models';
import { RegisterStockRequest } from './stocks.schemas';
import { BaseMapper } from '../core/mapper/baseMapper';

@Injectable()
export class StocksMapper
  implements BaseMapper<Stocks, StocksClientEntity, StocksPersistenceEntity>
{
  public fromEntityToClient(entity: Stocks): StocksClientEntity {
    return {
      stock: entity.stock,
      day: entity.day.toISOString().split('T')[0],
      contribution: entity.contribution,
      quotas: entity.quotas,
      current_quota_value: entity.currentQuotaValue,
      current_value: entity.currentValue,
      mean_quota_value: entity.meanQuotaValue,
      invested_value: entity.investedValue,
      daily_variation: entity.dailyVariation,
      daily_variation_percent: entity.dailyVariationPercent,
      variation: entity.variation,
      variation_percent: entity.variationPercent,
      category: entity.category,
    };
  }

  public fromEntityToClientBulk(entities: Stocks[]): StocksClientEntity[] {
    return entities.map(this.fromEntityToClient);
  }

  public fromEntityToPersistence(entity: Stocks): StocksPersistenceEntity {
    const currentTime = new Date(Date.now());

    return {
      id: entity.id,
      stock: entity.stock.toUpperCase(),
      day: entity.day,
      contribution: entity.contribution,
      quotas: entity.quotas,
      currentQuotaValue: entity.currentQuotaValue,
      currentValue: entity.currentValue,
      meanQuotaValue: entity.meanQuotaValue,
      investedValue: entity.investedValue,
      dailyVariation: entity.dailyVariation,
      dailyVariationPercent: entity.dailyVariationPercent,
      variation: entity.variation,
      variationPercent: entity.variationPercent,
      category: entity.category,
      createdAt: currentTime.toISOString(),
      updatedAt: currentTime.toISOString(),
    };
  }

  public fromEntityToPersistenceBulk(
    entities: Stocks[],
  ): StocksPersistenceEntity[] {
    return entities.map(this.fromEntityToPersistence);
  }

  public fromPersistenceToEntity(persistence: StocksPersistenceEntity): Stocks {
    return {
      id: persistence.id,
      stock: persistence.stock.toUpperCase(),
      day: persistence.day,
      contribution: persistence.contribution,
      quotas: persistence.quotas,
      currentQuotaValue: persistence.currentQuotaValue,
      currentValue: persistence.currentValue,
      meanQuotaValue: persistence.meanQuotaValue,
      investedValue: persistence.investedValue,
      dailyVariation: persistence.dailyVariation,
      dailyVariationPercent: persistence.dailyVariationPercent,
      variation: persistence.variation,
      variationPercent: persistence.variationPercent,
      category: persistence.category,
      createdAt: new Date(persistence.createdAt),
      updatedAt: new Date(persistence.updatedAt),
    };
  }

  public buildStock(request: RegisterStockRequest) {
    return {
      stock: request,
      day: request.day,
      contribution: request.contribution,
      quotas: request.quotas,
      currentQuotaValue: request.current_quota_value,
      category: request.category,
    };
  }
}
