import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  //for retrive cookie
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
