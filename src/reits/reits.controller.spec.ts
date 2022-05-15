import { Test, TestingModule } from '@nestjs/testing';
import { ReitsController } from './reits.controller';

describe('ReitsController', () => {
  let controller: ReitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReitsController],
    }).compile();

    controller = module.get<ReitsController>(ReitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
