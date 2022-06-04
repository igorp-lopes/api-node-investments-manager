import { Injectable } from '@nestjs/common';
import { ReitsRepository } from './reits.repository';

@Injectable()
export class ReitsService {
  constructor(private reitsRepository: ReitsRepository) {}

  public testReitServiceMethod(value: string) {
    this.reitsRepository.testSaveReits();
    return value;
  }
}
