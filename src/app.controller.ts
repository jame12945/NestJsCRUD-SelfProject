import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//Decorator is Controller
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('nestjsSay')
  getHello(): string {
    return this.appService.getHello();
  }
}
