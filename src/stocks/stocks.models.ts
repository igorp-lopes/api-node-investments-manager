import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterStockDto {
  @IsString()
  stock: string;

  @IsDate()
  day: Date;

  @IsNumber()
  @IsOptional()
  contribution: number;

  @IsNumber()
  quotas: number;

  @IsNumber()
  current_quota_value: number;
}
