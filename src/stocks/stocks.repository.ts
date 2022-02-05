import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma.service';

@Injectable()
export class StocksRepository {
  constructor(private prisma: PrismaService) {}

  saveStock(): string {
    return 'This endpoint adds an stock record information for a given day';
  }
}
