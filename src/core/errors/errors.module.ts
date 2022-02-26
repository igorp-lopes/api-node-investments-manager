import { Module } from '@nestjs/common';
import { ErrorsService } from 'src/core/errors/errors.service';

@Module({ providers: [ErrorsService], exports: [ErrorsService] })
export class ErrorsModule {}
