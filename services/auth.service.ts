import HttpException from "../exception/httpException"
import EmployeeService from "./employee.service"
import bcrypt from 'bcrypt';

export class AuthService{
 constructor(private employeeService:EmployeeService){
 }

 async login(email:string,password:string){
    const employee=await this.employeeService.getEmployeeByEmail(email)
    if(!employee){
        throw new HttpException(404,"No such user")
    }
    const isPasswordValid=await bcrypt.compare(password,employee.password)
    if(!isPasswordValid){
        throw new HttpException(400,"Invalid Password")
    }

 }
}

