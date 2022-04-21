import { IdentifiedError } from '../core/errors/errors.models';
import { HttpStatus } from '@nestjs/common';

export class StocksErrors {
  public static EST001: IdentifiedError = {
    type: 'Bad Request',
    status: HttpStatus.BAD_REQUEST,
    name: 'EST001',
    message: 'Stock record already exists',
  };

  public static EST002: IdentifiedError = {
    type: 'Not Found',
    status: HttpStatus.NOT_FOUND,
    name: 'EST002',
    message: 'Stock record for the given stock and given date does not exists',
  };
}
