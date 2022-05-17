import { Module } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';
import { ReitsController } from './reits.controller';
import { ReitsService } from './reits.service';
import { ReitsRepository } from './reits.repository';

@Module({
  controllers: [ReitsController],
  providers: [ReitsService, ReitsRepository, PrismaService],
})
export class ReitsModule {}
