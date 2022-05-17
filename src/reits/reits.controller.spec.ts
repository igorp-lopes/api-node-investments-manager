import { Test, TestingModule } from '@nestjs/testing';
import { ReitsController } from './reits.controller';
import { PrismaService } from '../core/prisma.service';
import { ReitsService } from './reits.service';
import { ReitsRepository } from './reits.repository';

describe('ReitsController', () => {
  let controller: ReitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReitsController],
      providers: [ReitsService, ReitsRepository, PrismaService],
    }).compile();

    controller = module.get<ReitsController>(ReitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
