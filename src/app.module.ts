import { Module } from '@nestjs/common';
import { StocksModule } from './stocks/stocks.module';
import { ErrorsModule } from './core/errors/errors.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomHttpExceptionFilter } from './core/errors/http-custom-exception.filter';
import { ReitsModule } from './reits/reits.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: { transport: { target: 'pino-pretty' } },
    }),
    StocksModule,
    ErrorsModule,
    ReitsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
