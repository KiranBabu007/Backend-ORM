import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";
import Employee, { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import { Column } from "typeorm";
import { createDepartmentDto } from "./create-department.dto";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  employeeId:string

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto; 


  @ValidateNested()
  @Type(() => createDepartmentDto)
  department: createDepartmentDto;

@IsNotEmpty()
@IsNumber()
departmentId: number;


  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password:string


@IsEnum(EmployeeRole)
role: EmployeeRole

@IsEnum(EmployeeStatus)
status: EmployeeStatus


dateOfJoining:Date

@IsNumber()
experience:number



}

