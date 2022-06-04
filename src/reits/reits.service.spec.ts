import { Test, TestingModule } from '@nestjs/testing';
import { ReitsService } from './reits.service';
import { ReitsRepository } from './reits.repository';
import { PrismaService } from '../core/prisma.service';

describe('ReitsService', () => {
  let service: ReitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReitsService, ReitsRepository, PrismaService],
    }).compile();

    service = module.get<ReitsService>(ReitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
