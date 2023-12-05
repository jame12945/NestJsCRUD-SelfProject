import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//Decorator is Module
//Decorator คือ expression ที่จะคืนค่าเป็น function. สังเกตุมี @ นำหน้า
@Module({
  imports: [],
  //controllers
  controllers: [AppController],
  //services
  providers: [AppService],
})
export class AppModule {}
