import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(process.env.APP);
    return this.appService.getHello();
  }

  @Get('/example-k8s')
  getExample(): string {
    return this.appService.getExample();
  }
}
