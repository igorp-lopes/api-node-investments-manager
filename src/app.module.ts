import { Module } from '@nestjs/common';
import { StocksModule } from './stocks/stocks.module';
import { ErrorsModule } from './core/errors/errors.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomHttpExceptionFilter } from './core/errors/http-custom-exception.filter';
import { ReitsController } from './reits/reits.controller';
import { ReitsService } from './reits/reits.service';

@Module({
  imports: [StocksModule, ErrorsModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomHttpExceptionFilter,
    },
    ReitsService,
  ],
  controllers: [ReitsController],
})
export class AppModule {}
