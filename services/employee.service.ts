import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee, { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from 'bcrypt'
import { LoggerService } from "./loggerservice";
import DepartmentRepository from "../repositories/department.repository";
import DepartmentService from "./department.service";
import { CreateEmployeeDto } from "../dto/create-employee.dto";


class EmployeeService {
    private logger=LoggerService.getInstance(EmployeeService.name)
    constructor(private employeeRepository: EmployeeRepository,private departmentService:DepartmentService) {
    }

    async createEmployee(createEmployeeDto:CreateEmployeeDto): Promise<Employee> {

        const {email,employeeId,name,role,age,dateOfJoining,experience,status,password,departmentId,address} = createEmployeeDto

        const newAddress= new Address()
        newAddress.line1=address.line1
        newAddress.pincode=Number(address.pincode)
        const newEmployee= new Employee();
        newEmployee.address=newAddress
        newEmployee.email=email
        newEmployee.employeeId=employeeId
        newEmployee.name=name,
        newEmployee.role=role
        newEmployee.age=age
        newEmployee.dateOfJoining=dateOfJoining
        newEmployee.experience=experience
        newEmployee.status=status
        newEmployee.password=await bcrypt.hash(password,10)
        const department=await this.departmentService.getDepartmentById(departmentId)
        newEmployee.department=department
        
        
        return this.employeeRepository.create(newEmployee)
    }

    async getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.findAll()
    }

    async getEmployeeById(id:number):Promise<Employee>{
        let employee=await this.employeeRepository.findById(id);
        if(!employee){
            throw new Error("Employee not found");
        }
        return employee;

    }

    async getEmployeeByEmail(email:string):Promise<Employee>{
        return this.employeeRepository.findByEmail(email)
    }

    async updateEmployee(id:number,email:string,name:string,role:EmployeeRole){
        const existingEmployee=await this.employeeRepository.findById(id);
        if(existingEmployee){
            existingEmployee.name=name || existingEmployee.name
            existingEmployee.email=email || existingEmployee.email
            existingEmployee.role=role || existingEmployee.role
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