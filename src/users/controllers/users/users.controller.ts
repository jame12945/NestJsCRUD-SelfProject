/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    
    constructor(private userService: UsersService){}

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

}
