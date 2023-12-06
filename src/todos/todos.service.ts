import { Injectable } from "@nestjs/common";
import { Todo } from "./todo.entity";
import { Repository } from "typeorm";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable() 
export class TodosService {
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>){}
  //Hard Code for now
  async create(dto: CreateTodoDto) {
    const todo = this.todoRepository.create(dto);

    return await this.todoRepository.save(todo);
  }

  findMany(){
    // return this.todoRepository.find({where: { id: 1}});
    return this.todoRepository.find();
  }

  async update(id: number ,dto: CreateTodoDto){
    const todo = await this.todoRepository.findOne({where: { id }});
    //check record exists
    Object.assign(todo , dto);
    await this.todoRepository.save(todo);
    return todo;
  }

  async delete(id: number){
    const todo = await this.todoRepository.findOne({where: { id }});
    console.log(todo);
    return await this.todoRepository.remove(todo);
   
  }

}