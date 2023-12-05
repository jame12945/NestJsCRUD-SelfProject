import { Injectable } from '@nestjs/common';
//Decorator is Injectable
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
