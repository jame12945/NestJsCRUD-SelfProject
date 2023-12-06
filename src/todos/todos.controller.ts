import { Body, Controller, Post, Get, Put, Param, Delete } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dtos/create-todo.dto";
@Controller('todos')
export class TodosController {
    constructor(private readonly todoService: TodosService){}
    @Post()
    create(@Body() dto: CreateTodoDto){
         return this.todoService.create(dto);
    }
    @Get()
    findMany(){
         return this.todoService.findMany();
    }
    @Put(':id')
    update(@Param('id') id: number ,@Body() dto: CreateTodoDto){
         return this.todoService.update(id,dto);
    }
    @Delete(':id')
    delete(@Param('id') id: number){
        return this.todoService.delete(id);
    }
}