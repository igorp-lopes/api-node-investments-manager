import { INestApplication, ValidationPipe } from '@nestjs/common';

export const setupGlobalModules = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
};
