/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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

}
