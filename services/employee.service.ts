
import Address from "../entities/address.entity";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from 'bcrypt'
import { LoggerService } from "./loggerservice";
import DepartmentService from "./department.service";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";


class EmployeeService {
    private logger = LoggerService.getInstance(EmployeeService.name)
    constructor(private employeeRepository: EmployeeRepository, private departmentService: DepartmentService) {
    }

    async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {

        const { email, employeeId, name, role, age, dateOfJoining, experience, status, password, departmentId, address } = createEmployeeDto

        const newAddress = new Address()
        newAddress.line1 = address.line1
        newAddress.pincode = Number(address.pincode)
        newAddress.line2 = address.line2
        newAddress.houseNo = address.houseNo
        const newEmployee = new Employee();
        newEmployee.address = newAddress
        newEmployee.email = email
        newEmployee.employeeId = employeeId
        newEmployee.name = name,
            newEmployee.role = role
        newEmployee.age = age
        newEmployee.dateOfJoining = dateOfJoining
        newEmployee.experience = experience
        newEmployee.status = status
        newEmployee.password = await bcrypt.hash(password, 10)
        const department = await this.departmentService.getDepartmentById(departmentId)
        newEmployee.department = department


        return this.employeeRepository.create(newEmployee)
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findAll()
    }

    async getEmployeeById(id: number): Promise<Employee> {
        let employee = await this.employeeRepository.findById(id);
        if (!employee) {
            throw new Error("Employee not found");
        }
        return employee;

    }

    async getEmployeeByEmail(email: string): Promise<Employee> {
        return this.employeeRepository.findByEmail(email)
    }

    async updateEmployee(updateEmployeeDto: UpdateEmployeeDto) {
        const existingEmployee = await this.employeeRepository.findById(updateEmployeeDto.id);

        if (!existingEmployee) {
            throw new Error("Employee not found");
        }

        const id = updateEmployeeDto.id
        const { name, email, role, employeeId, age, status, dateOfJoining, experience,departmentId } = updateEmployeeDto
        if (name !== undefined) existingEmployee.name = name;
        if (email !== undefined) existingEmployee.email = email;
        if (role !== undefined) existingEmployee.role = role;
        if (employeeId !== undefined) existingEmployee.employeeId = employeeId;
        if (age !== undefined) existingEmployee.age = age;
        if (experience !== undefined) existingEmployee.experience = experience;
        if (status !== undefined) existingEmployee.status = status;
        if (dateOfJoining !== undefined) existingEmployee.dateOfJoining = dateOfJoining;
        if (departmentId !== undefined) {
        const department = await this.departmentService.getDepartmentById(departmentId);
        existingEmployee.department = department;
    }

        await this.employeeRepository.update(id, existingEmployee)
        return existingEmployee;

    }

    async deleteEmployee(id: number) {
        const employee = await this.employeeRepository.findById(id);
        if (employee) {
            await this.employeeRepository.remove(employee)
        }
        

    }
}


export default EmployeeService