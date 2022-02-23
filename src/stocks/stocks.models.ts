import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterStockRequestDto {
  @IsString()
  readonly stock: string;

  @Type(() => Date)
  @IsDate()
  readonly day: Date;

  @IsNumber()
  @IsOptional()
  readonly contribution: number;

  @IsNumber()
  @IsPositive()
  readonly quotas: number;

  @IsNumber()
  @IsPositive()
  readonly current_quota_value: number;

  @IsString()
  @IsOptional()
  readonly category: string;
}

export class DeleteStockRecordsQueryDto {
  @Type(() => Date)
  @IsDate()
  readonly start_date: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly end_date: Date;
}

export interface StocksRegisterResponseDto {
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
