import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma.service';

export const setupGlobalModules = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
};

export const cleanupDatabase = async (prisma: PrismaService) => {
  const deleteStocksRecords = prisma.stocks.deleteMany();

  await prisma.$transaction([deleteStocksRecords]);

  await prisma.$disconnect();
};

export const generateFakerDate = (fakerDate: Date) => {
  return new Date(fakerDate.toISOString().split('T')[0]);
};

export const addDaysToDate = (date: Date, days = 1) => {
  const finalDate = new Date(date.valueOf());
  finalDate.setDate(date.getDate() + days);
  return finalDate;
};
