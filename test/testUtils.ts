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
