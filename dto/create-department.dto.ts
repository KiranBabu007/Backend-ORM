import { IsNotEmpty, IsString } from "class-validator";


export class createDepartmentDto{
    
  
  @IsString()
  name: string;

}