import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from 'bcrypt'


class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {
    }

    async createEmployee(email:string,name:string,age:number,address:CreateAddressDto,password:string,role:EmployeeRole): Promise<Employee> {

        const newAddress= new Address()
        newAddress.line1=address.line1
        newAddress.pincode=Number(address.pincode)
        const newEmployee= new Employee();
        newEmployee.address=newAddress
        newEmployee.email=email
        newEmployee.name=name,
        newEmployee.role=role
        newEmployee.age=age
        newEmployee.password=await bcrypt.hash(password,10)
        
        return this.employeeRepository.create(newEmployee)
    }

    async getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.findAll()
    }

    async getEmployeeById(id:number):Promise<Employee>{
        return this.employeeRepository.findById(id)
    }

    async getEmployeeByEmail(email:string):Promise<Employee>{
        return this.employeeRepository.findByEmail(email)
    }

    async updateEmployee(id:number,email:string,name:string){
        const existingEmployee=await this.employeeRepository.findById(id);
        if(existingEmployee){
            existingEmployee.name=name || existingEmployee.name
            existingEmployee.email=email || existingEmployee.email
            await this.employeeRepository.update(id,existingEmployee)
        }
    }

    async deleteEmployee(id:number){
        const employee =await this.employeeRepository.findById(id);
        if(employee){
            await this.employeeRepository.remove(employee)
        }
        // await this.employeeRepository.delete(id)

    }
}


export default EmployeeService