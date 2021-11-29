import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HealthCheckResponse } from '$/dto';
import { ApiGroup } from '$/enum/api-group.enum';

const TAG = ApiGroup.Health;

@Controller('health')
export class HealthController {
  @Get('/')
  @ApiOperation({
    summary: 'Get the health status of this service.',
    description: 'Provides the health status of the current application.',
  })
  @ApiTags(TAG)
  @ApiResponse({
    status: 200,
    description: 'This service is healthy.',
    type: HealthCheckResponse,
  })
  getHealth(): HealthCheckResponse {
    return new HealthCheckResponse({ status: 'OK' });
  }
}
