import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../core/prisma.service';
import { ReitsRepository } from './reits.repository';

describe('Reits Repository Unit Tests', () => {
  let repository: ReitsRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReitsRepository, PrismaService],
    }).compile();

    repository = module.get<ReitsRepository>(ReitsRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
