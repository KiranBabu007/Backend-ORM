import Address from "../entities/address.entity";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";


class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {
    }

    async createEmployee(email:string,name:string,age:number,address:Address): Promise<Employee> {
        const newEmployee= new Employee();
        newEmployee.name=name
        newEmployee.email=email
        newEmployee.age=age
        newEmployee.address=address
        return this.employeeRepository.create(newEmployee)
    }

    async getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.findAll()
    }

    async getEmployeeById(id:number):Promise<Employee>{
        return this.employeeRepository.findById(id)
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