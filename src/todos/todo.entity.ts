/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn , CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'todos'})
export class Todo {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    titles:string

    @Column()
    descriptions:string

    @CreateDateColumn()
    created:Date

    @UpdateDateColumn()
    updated:Date

    
}