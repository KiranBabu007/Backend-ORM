import { mock, MockProxy } from "jest-mock-extended"
import EmployeeRepository from "../../repositories/employee.repository"
import EmployeeService from "../../services/employee.service"
import {when} from 'jest-when'
import Employee from "../../entities/employee.entity"
import DepartmentService from "../../services/department.service"

describe('EmployeeService',()=>{

   let employeeRepository:MockProxy<EmployeeRepository>
   let employeeService: EmployeeService;
   let departmentService: DepartmentService

    beforeEach(()=>{
            employeeRepository = mock<EmployeeRepository>()
            departmentService = mock<DepartmentService>()
            employeeService = new EmployeeService(employeeRepository,departmentService)
            
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
})