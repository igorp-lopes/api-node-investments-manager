import { Injectable } from '@nestjs/common';
import {
  Stock,
  StockClientEntity,
  StockPersistenceEntity,
} from './stocks.models';
import { RegisterStockRequest } from './stocks.schemas';
import { BaseMapper } from '../core/mapper/baseMapper';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StocksMapper
  implements BaseMapper<Stock, StockClientEntity, StockPersistenceEntity>
{
  public fromEntityToClient(entity: Stock): StockClientEntity {
    return {
      stock: entity.stock,
      date: entity.date.toISOString().split('T')[0],
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

  public fromEntityToClientBulk(entities: Stock[]): StockClientEntity[] {
    return entities.map(this.fromEntityToClient);
  }

  public fromEntityToPersistence(entity: Stock): StockPersistenceEntity {
    const currentTime = new Date(Date.now());

    return {
      id: entity.id,
      stock: entity.stock.toUpperCase(),
      date: entity.date,
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
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  public fromEntityToPersistenceBulk(
    entities: Stock[],
  ): StockPersistenceEntity[] {
    return entities.map(this.fromEntityToPersistence);
  }

  public fromPersistenceToEntity(persistence: StockPersistenceEntity): Stock {
    return {
      id: persistence.id,
      stock: persistence.stock.toUpperCase(),
      date: persistence.date,
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
    };
  }

  public buildStock(request: RegisterStockRequest): Stock {
    return {
      id: uuidv4(),
      stock: request.stock.toUpperCase(),
      date: request.date,
      contribution: request.contribution,
      quotas: request.quotas,
      currentQuotaValue: request.current_quota_value,
      category: request.category,
      currentValue: 0,
      meanQuotaValue: 0,
      investedValue: 0,
      dailyVariation: 0,
      dailyVariationPercent: 0,
      variation: 0,
      variationPercent: 0,
    };
  }
}
