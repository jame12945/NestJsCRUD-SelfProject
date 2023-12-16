/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";


export class CreateTodoDto {
    @IsNotEmpty()
    titles: string;

    @IsNotEmpty()
    descriptions:string


}