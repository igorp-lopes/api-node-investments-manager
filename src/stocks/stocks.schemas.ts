import { Type } from 'class-transformer';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class RegisterStockRequest {
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

export class DeleteStockRecordsRequest {
  @Type(() => Date)
  @IsDate()
  readonly start_date: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly end_date: Date;
}
