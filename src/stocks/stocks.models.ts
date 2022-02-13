import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterStockDto {
  @IsString()
  readonly stock: string;

  @Type(() => Date)
  @IsDate()
  readonly day: Date;

  @IsNumber()
  @IsOptional()
  readonly contribution: number;

  @IsNumber()
  readonly quotas: number;

  @IsNumber()
  readonly current_quota_value: number;

  @IsString()
  @IsOptional()
  readonly category: string;
}

export class DeleteStockRecordsQueryDto {
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly start_date: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly end_date: Date;
}

export interface StocksRegisterInfoDto {
  stock: string;
  day: string;
  contribution: number;
  quotas: number;
  current_quota_value: number;
  current_value: number;
  mean_quota_value: number;
  invested_value: number;
  daily_variation: number;
  daily_variation_percent: number;
  variation: number;
  variation_percent: number;
  category: string;
}
