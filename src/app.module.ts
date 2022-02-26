import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { ErrorsModule } from './core/errors/errors.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomHttpExceptionFilter } from './core/errors/http-custom-exception.filter';

@Module({
  imports: [StocksModule, ErrorsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
