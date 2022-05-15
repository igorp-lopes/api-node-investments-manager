import { Test, TestingModule } from '@nestjs/testing';
import { ReitsService } from './reits.service';

describe('ReitsService', () => {
  let service: ReitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReitsService],
    }).compile();

    service = module.get<ReitsService>(ReitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
