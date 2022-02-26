import { HttpException, Injectable } from '@nestjs/common';
import { IdentifiedError } from './errors.models';

@Injectable()
export class ErrorsService {
  public static validateCondition(condition: boolean, error: IdentifiedError) {
    if (!condition) {
      throw new HttpException(
        {
          name: error.name,
          error: error.type,
          status: error.status,
          message: error.message,
        },
        error.status,
      );
    }
  }
}
