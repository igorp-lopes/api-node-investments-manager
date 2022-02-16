import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { ErrorsModule } from './core/errors/errors.module';

@Module({
  imports: [StocksModule, ErrorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
