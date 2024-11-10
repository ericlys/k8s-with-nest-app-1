import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth(): boolean {
    // Todo: check dependencies
    console.log('Chequei a saúde da aplicação');
    if (new Date().getMilliseconds() % 2 === 0) {
      return true;
    }
    return false;
  }

  checkReady(): string {
    console.log('Chequei a prontidão da aplicação');
    return 'OK!';
  }
}
