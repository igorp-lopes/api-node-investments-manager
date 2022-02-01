import { Injectable } from '@nestjs/common';

@Injectable()
export class StocksRepository {
  saveStock(): string {
    return 'This endpoint adds an stock record information for a given day';
  }
}
