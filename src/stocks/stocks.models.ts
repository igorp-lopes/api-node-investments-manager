import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Stocks } from '@prisma/client';
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

export class DeleteStockRecordsDto {
  @IsString()
  readonly stock: string;

  @Type(() => Date)
  @IsDate()
  readonly dates: string[];
}

export type StocksRegisterInfoDto = Omit<
  Stocks,
  'id' | 'createdAt' | 'updatedAt'
>;
