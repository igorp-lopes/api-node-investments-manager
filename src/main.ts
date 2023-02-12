import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './core/prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { CustomHttpExceptionFilter } from './core/errors/http-custom-exception.filter';
import { Logger } from 'nestjs-pino';

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalFilters(new CustomHttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(process.env.APP_PORT);
}

bootstrap();
