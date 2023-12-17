/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Catch, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserAuthDto } from 'src/users/dtos/CreateUserAuth.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfie.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Response,Request } from 'express'
import { PassThrough } from 'stream';

@Controller('users')
export class UsersController {
    
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
       
        ){}

    @Get()
    getUsers(){
        const users = this.userService.findUsers();
        return users;
     
    }

    @Post()
    createUsers(@Body() createUserDto: CreateUserDto){
        return this.userService.createUsers(createUserDto);
  
    }
    //put = mod modifying entired resource (change all of resource)
    //patch= mod modifying portion of entired resource (change some part of resource)
    //async may be dont need return but can have
    //use dto body when use Post , Put and Patch
    
    @Put(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto:UpdateUserDto,
    ){
        await this.userService.updateUser(id,updateUserDto);
    }

    @Delete(':id')
    async deleteUserById(@Param('id',ParseIntPipe) id: number){
        await this.userService.deleteUser(id);
    }
    //One to One Relationship Between User and Profile
    @Post(':id/profiles')
    createUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto:CreateUserProfileDto
        ){
          return this.userService.createUserProfile(id,createUserProfileDto);
    }
    //One to Many Relationship Between User and Post
    @Post(':id/posts')
    createUserPost(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserPostDto : CreateUserPostDto,
        ){

            return this.userService.createUserPost(id,createUserPostDto);
        }

    //Add Logic Authenication here
    @Post('register')
    async register(@Body() createUserAuthDto: CreateUserAuthDto ){
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserAuthDto.password ,saltOrRounds); 
        const registrationData = {
            name: createUserAuthDto.name,
            email: createUserAuthDto.email,
            password: hashedPassword,
          };

        return this.userService.createUserRegister(registrationData)
    }
    @Post('login')
    async login(
        @Body() createUserAuthDto: CreateUserAuthDto , 
        @Res({passthrough: true}) response: Response,
        ) {
        const user = await this.userService.findloginUser(createUserAuthDto.email);
         if(!user){
            throw new HttpException(
                'User not found. Cannot Login',
                HttpStatus.BAD_REQUEST,
               );
         }
        if(!await bcrypt.compare( createUserAuthDto.password, user.password)){
            throw new HttpException(
                'Password mismatch',
                HttpStatus.BAD_REQUEST,
               );
        }

        //store jwt in cookie as http for use in frontend
        const jwt = await this.jwtService.signAsync({id: user.id})

        response.cookie('jwt', jwt, {httpOnly: true});
        
        // return user;
        // return jwt
        
        return {
            message: 'success!',
        }

      }

      
      //next retrive the cookie
      @Get('getcookie')
      async getcookie(@Req() request: Request){
        try{
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        console.log('Verified data:', data);
        if(!data){
            throw new UnauthorizedException()
        }
        //return user data from cookie
        const user = await this.userService.findIdinUser({id: data['id']});
        console.log('User data:', user);
        return user;
        
    }
     catch(e){
        throw new UnauthorizedException()
     }
      }
}
