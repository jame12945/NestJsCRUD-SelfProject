/* eslint-disable prettier/prettier */

//Incase For checking data that you dontwant to push to database like confirm passwords
export type CreateUserParams = {
    username:string ;
    password:string ;
  
}
export type UpdateUserParams = {
    username:string ;
    password:string ;
  
}

export type CreateUserProfileParams = {
    firstname:string;
    lastname:string;
    age:number;
    dateofbirth: string;
}

export type CreateUserPostParams ={
    title:string;
    description:string;
}