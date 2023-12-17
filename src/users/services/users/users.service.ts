/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostFromUser } from 'src/typeorm/entities/Post';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { UserAuth } from 'src/typeorm/entities/UsersAuth';
import { CreateUserAuthParams, CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/type';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    //can call external api here  may be save data to database here
    //interact with database use inject typeorm repository to this class  
    // 1.Define Constructor 
    // 2.define entity files in constructor
    constructor(@InjectRepository(User) private userRepository: Repository<User> ,
                @InjectRepository(Profile) private profileRepository: Repository<Profile>,
                @InjectRepository(PostFromUser) private postRepository: Repository<PostFromUser>,
                @InjectRepository(UserAuth) private userAuthRepository: Repository<UserAuth>){}
    
    findUsers(){
        //find all users in database
       return this.userRepository.find({ relations : ['profile','posts']})  //database do something with teturn order
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
    //one to one relationship between users and users_profiles
    async createUserProfile(id:number,createUserProfileDetails: CreateUserProfileParams){
        const user = await this.userRepository.findOneBy({ id })
        if(!user)
        throw new HttpException(
           'User not found. Cannot create user profile',
           HttpStatus.BAD_REQUEST,
          );
          //.create is not asynchronize function so did not nee await
        const newProfile = this.profileRepository.create(createUserProfileDetails);
        //save in users_profiles database
        const savedProfile = await this.profileRepository.save(newProfile);
        //update user profile after join table
        user.profile =savedProfile;
        return this.userRepository.save(user);
    }
 
    //one to many relationship between users and user_posts
    async createUserPost(id:number,createUserPostDetails: CreateUserPostParams){
      const user = await this.userRepository.findOneBy({ id })
      if(!user)
      throw new HttpException(
         'User not found. Cannot create user profile',
         HttpStatus.BAD_REQUEST,
        );
        //to ensure that createUserPostDetails related to user with this line  (...createUserPostDetails,user,)
      const newPost = this.postRepository.create({
        ...createUserPostDetails,
        user,
      });
      return this.postRepository.save(newPost)
    }

    //add logic register,login here
    async createUserRegister(createUserDetails: CreateUserAuthParams): Promise<UserAuth>{
      return this.userAuthRepository.save(createUserDetails);
    }

   async findloginUser(email: CreateUserAuthParams['email']): Promise<UserAuth> {
             return this.userAuthRepository.findOne({where: { email }});
   }

   async findIdinUser(id:any): Promise<UserAuth> {
    return this.userAuthRepository.findOne({where: id});
}


}
