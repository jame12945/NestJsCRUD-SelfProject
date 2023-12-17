/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Profile } from 'src/typeorm/entities/Profile';
import { PostFromUser } from 'src/typeorm/entities/Post';
import { UserAuth } from 'src/typeorm/entities/UsersAuth';
import { JwtModule } from '@nestjs/jwt';

@Module({
  //if user User in dervice dont forhet to use imports: [TypeOrmModule.forFeature([User])]
  imports: [TypeOrmModule.forFeature([User ,Profile, PostFromUser, UserAuth]),
  JwtModule.register({
    secret: 'secret',
    signOptions: {expiresIn: '1d'},
 }),],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
