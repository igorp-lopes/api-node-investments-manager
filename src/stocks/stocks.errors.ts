import { IdentifiedError } from '../core/errors/errors.models';
import { HttpStatus } from '@nestjs/common';

export class StocksErrors {
  public static EST001: IdentifiedError = {
    type: 'Bad Request',
    status: HttpStatus.BAD_REQUEST,
    name: 'EST001',
    message: 'Stock record already exists',
  };
}
