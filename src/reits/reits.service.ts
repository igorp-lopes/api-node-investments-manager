import { Injectable } from '@nestjs/common';

@Injectable()
export class ReitsService {
  public testReitServiceMethod(value: string) {
    return value;
  }
}
