/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: "users_auth"})
export class UserAuth {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({unique: true})
    email: string;
    @Column()
    password: string;



}