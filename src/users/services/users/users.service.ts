/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    //can call external api here  may be save data to database here
    //interact with database use inject typeorm repository to this class  
    // 1.Define Constructor 
    // 2.define entity files in constructor
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}
    
    findUsers(){
        //find all users in database
       return this.userRepository.find()  //database do something with teturn order
    }

    //now its not a synchronus so didn't need to use await
    //use utils here (Almost with Create or Update)
    createUsers(createUserDetails: CreateUserParams ){
      const newUser = this.userRepository.create({
        ...createUserDetails,
        createdAt: new Date()
      });

      //save to database
      return this.userRepository.save(newUser);

    }

    updateUser(id:number ,updateUserDetails: UpdateUserParams){
      return  this.userRepository.update({ id },{...updateUserDetails , createdAt: new Date()} );
    }

    deleteUser(id:number)
    {
      return this.userRepository.delete({id});
    }

}
