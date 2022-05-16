import { Controller, Get, Param } from '@nestjs/common';

@Controller('reits')
export class ReitsController {
  @Get('/:test_value')
  async testReitEndpoint(@Param() params): Promise<any> {
    const value = params.test_value;
    return value;
  }
}
