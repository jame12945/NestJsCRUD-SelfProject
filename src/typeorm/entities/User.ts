/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './Profile';
import { Post } from '@nestjs/common';
import { PostFromUser } from './Post';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({type: 'integer',})
  id: number;

  @Column({unique: true})
  username:string;

  @Column()
  password:string;

  @Column()
  createdAt:Date;

  @Column( {nullable: true})   
  authStrategy: string;
  
  //one to one relationship
  @OneToOne(() => Profile)
  @JoinColumn()
  profile:Profile;
  //one to many relationship must have reverse like (post)=> post.user
  @OneToMany(() => PostFromUser, (post)=> post.user)
  posts: PostFromUser[];


}
