import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth(): string {
    // Todo: check dependencies
    return 'OK!';
  }

  checkReady(): string {
    return 'OK!';
  }
}
