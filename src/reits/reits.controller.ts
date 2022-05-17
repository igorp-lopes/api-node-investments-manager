import { Controller, Get, Param } from '@nestjs/common';
import { ReitsService } from './reits.service';

@Controller('reits')
export class ReitsController {
  constructor(private reitsService: ReitsService) {}

  @Get('/:test_value')
  async testReitEndpoint(@Param() params): Promise<any> {
    const value = params.test_value;
    return this.reitsService.testReitServiceMethod(value);
  }
}
