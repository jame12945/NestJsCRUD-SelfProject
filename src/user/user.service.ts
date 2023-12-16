import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpDto } from './dto/signup.dto';
import * as brcypt from 'bcrypt';
import { User } from './user.entity';
@Injectable()
export class UserService {
    constructor(
    @InjectRepository(UserRepository)
    private UserRepository: UserRepository
    ){}
    
    async signUp(signupUpDto:SignUpDto):Promise<User>{
     try{
        const {
            username,
            password,
           
     } = signupUpDto

     const hashedPassword = brcypt.hashSync(password, 10);
     const user =await this.UserRepository.create({
         username,
         password:hashedPassword,
     })
     return await this.UserRepository.save(user)
     }
     catch(e){
        throw new ConflictException({
            message: ['Username has been already using']
        })
     }
    }

}
