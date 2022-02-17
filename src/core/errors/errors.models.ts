import { HttpStatus } from '@nestjs/common';

export interface IdentifiedError {
  type: string;
  status: HttpStatus;
  name: string;
  description: string;
}
