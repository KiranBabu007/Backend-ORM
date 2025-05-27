import { mock, MockProxy } from "jest-mock-extended"
import EmployeeRepository from "../../repositories/employee.repository"
import EmployeeService from "../../services/employee.service"
import {when} from 'jest-when'
import Employee from "../../entities/employee.entity"
import DepartmentService from "../../services/department.service"
import { CreateEmployeeDto } from "../../dto/create-employee.dto"
import { UpdateEmployeeDto } from "../../dto/update-employee.dto"
import { EmployeeRole, EmployeeStatus } from "../../entities/employee.entity"

describe('EmployeeService', () => {
    let employeeRepository: MockProxy<EmployeeRepository>
    let employeeService: EmployeeService;
    let departmentService: MockProxy<DepartmentService>  

    beforeEach(() => {
        employeeRepository = mock<EmployeeRepository>()
        departmentService = mock<DepartmentService>()    
        employeeService = new EmployeeService(employeeRepository, departmentService)
    })

    describe('getEmployeeById',()=>{

        it('should return value when user with proper id exists',async()=>{
            const mockEmp={id:123,name:"Employee Name"} as Employee
            when(employeeRepository.findById).calledWith(1).mockReturnValue(mockEmp)

            const result=await employeeService.getEmployeeById(1)

            expect(employeeRepository.findById).toHaveBeenCalledWith(1);
            expect(result).toStrictEqual(mockEmp)

        })

        it('should throw error when user with provided id does not exist',async()=>{

            when(employeeRepository.findById).calledWith(2).mockReturnValue(null)
            expect(employeeService.getEmployeeById(2)).rejects.toThrow("Employee not found")

            expect(employeeRepository.findById).toHaveBeenCalledWith(2)
        })
    })

    describe('createEmployee', () => {
        it('should create employee with valid data', async () => {
            const createDto = {
                email: 'test@test.com',
                employeeId: '123',
                name: 'Test Employee',
                role: EmployeeRole.DEVELOPER,
                age: 25,
                dateOfJoining: new Date(),
                experience: 2,
                status: EmployeeStatus.ACTIVE,
                password: 'password123',
                departmentId: 1,
                address: {
                    line1: 'Test Street',
                    pincode: 12345,
                    houseNo: 42,
                    line2: 'Test Area'
                }
            } as CreateEmployeeDto;  

            const mockDepartment = { id: 1, name: 'IT' };
            const expectedEmployee = { ...createDto, id: 1, department: mockDepartment } ;

            when(departmentService.getDepartmentById)
                .calledWith(1)
                .mockResolvedValue(mockDepartment);

            when(employeeRepository.create)  
                .calledWith(expect.any(Employee))
                .mockResolvedValue(expectedEmployee);

            const result = await employeeService.createEmployee(createDto);

            
            expect(result.email).toBe(createDto.email);
            expect(departmentService.getDepartmentById).toHaveBeenCalledWith(1);
            expect(employeeRepository.create).toHaveBeenCalled();
        });
    });

    describe('getAllEmployees', () => {
        it('should return all employees', async () => {
            const mockEmployees = [
                { id: 1, name: 'Employee 1' },
                { id: 2, name: 'Employee 2' }
            ] as Employee[];

            when(employeeRepository.findAll)
                .mockResolvedValue(mockEmployees);

            const result = await employeeService.getAllEmployees();

            expect(result).toHaveLength(2);
            expect(employeeRepository.findAll).toHaveBeenCalled();
        });
    });

    describe('updateEmployee', () => {
        it('should update employee with valid data', async () => {
            const updateDto = {
                id: 1,
                name: 'Updated Name',
                role: EmployeeRole.HR
            } as UpdateEmployeeDto;

            const existingEmployee = {
                id: 1,
                name: 'Old Name',
                role: EmployeeRole.DEVELOPER
            } as Employee;

            const updatedEmployee = { ...existingEmployee, ...updateDto };  
            when(employeeRepository.findById)
                .calledWith(1)
                .mockResolvedValue(existingEmployee);

            when(employeeRepository.update)
                .calledWith(1, expect.any(Object))
                .mockResolvedValue(undefined);

            await employeeService.updateEmployee(updateDto);  

            expect(employeeRepository.update).toHaveBeenCalledWith(1, expect.objectContaining({
                name: 'Updated Name',
                role: EmployeeRole.HR
            }));
        });

        it('should throw error when updating non-existent employee', async () => {
            const updateDto = {
                id: 999,
                name: 'Updated Name'
            } as UpdateEmployeeDto;

            when(employeeRepository.findById)
                .calledWith(999)
                .mockResolvedValue(null);

            await expect(employeeService.updateEmployee(updateDto))
                .rejects
                .toThrow('Employee not found');
        });
    });

    describe('deleteEmployee', () => {
        it('should delete existing employee', async () => {
            const mockEmployee = { id: 1, name: 'To Delete' } as Employee;
            
            when(employeeRepository.findById)
                .calledWith(1)
                .mockResolvedValue(mockEmployee);

            await employeeService.deleteEmployee(1);

            expect(employeeRepository.remove).toHaveBeenCalledWith(mockEmployee);
        });

        it('should not throw error when deleting non-existent employee', async () => {
            when(employeeRepository.findById)
                .calledWith(999)
                .mockResolvedValue(null);

            await expect(employeeService.deleteEmployee(999))
                .resolves
                .not
                .toThrow();
        });
    });
});