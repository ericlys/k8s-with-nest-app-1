import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/healthz')
  healthz(): string {
    const health = this.healthService.checkHealth();
    if (health) {
      return 'OK!';
    }
    throw new Error('Health check failed');
  }

  @Get('/readyz')
  readyz(): string {
    return this.healthService.checkReady();
  }
}
