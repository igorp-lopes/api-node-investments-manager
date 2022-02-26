import { Module } from '@nestjs/common';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { StocksRepository } from './stocks.repository';
import { PrismaService } from 'src/core/prisma.service';

@Module({
  controllers: [StocksController],
  providers: [StocksService, StocksRepository, PrismaService],
})
export class StocksModule {}
