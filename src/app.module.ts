/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/todo.entity';
import { join } from 'path';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        // entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TodosModule,
    UsersModule, 
  ],
  //controllers
  controllers: [AppController],
  //services
  providers: [AppService]
  
})
export class AppModule {}


// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TodosModule } from './todos/todos.module';
// import { Todo } from './todos/todo.entity';
// import { join } from 'path';
// import { AuthModule } from './auth/auth.module';
// import { UserService } from './user/user.service';
// import { UserModule } from './user/user.module';
// import { UsersModule } from './users/users.module';

// //Decorator is Module
// //Decorator คือ expression ที่จะคืนค่าเป็น function. สังเกตุมี @ นำหน้า
// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => ({
//         type: 'mysql',
//         host: configService.get('DB_HOST'),
//         port: +configService.get('DB_PORT'),
//         username: configService.get('DB_USERNAME'),
//         password: configService.get('DB_PASSWORD'),
//         database: configService.get('DB_NAME'),
//         entities: [join(process.cwd(), 'dist/**/*.entity.js')],
//         synchronize: true,
//       }),
//       inject: [ConfigService],
//     }),
//     TodosModule,
//     AuthModule,
//     UserModule, 
//   ],
//   //controllers
//   controllers: [AppController],
//   //services
//   providers: [AppService, UserService]
  
// })
// export class AppModule {}
