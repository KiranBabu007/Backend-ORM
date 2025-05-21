import { Request,Response,Router,NextFunction } from "express"
import EmployeeRepository from "../repositories/employee.repository"
import EmployeeService from "../services/employee.service"
import HttpException from "../exception/httpException"
import { isEmail } from "../validators/emailValidator"
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { CreateEmployeeDto } from "../dto/create-employee.dto"


class EmployeeController{
    constructor(private employeeService:EmployeeService,router:Router) {
        router.get('/',this.getAllEmployees),
        router.post('/',this.createEmployee),
        router.get('/:id',this.getEmployeeById),
        router.put('/:id',this.updateEmployee)
        router.delete('/:id',this.deleteEmployee)
    }

     createEmployee=async (req:Request,res:Response,next:NextFunction)=>{
           try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedEmployee = await this.employeeService.createEmployee(
        createEmployeeDto.email,
        createEmployeeDto.name,
        createEmployeeDto.age,
        createEmployeeDto.address
      );
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
       

    }

    getAllEmployees=async(req:Request,res:Response)=>{
        const employees=await this.employeeService.getAllEmployees()
        res.status(201).send(employees)
    }

    getEmployeeById=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const id =Number(req.params.id)
        const employee=await this.employeeService.getEmployeeById(id)
        if(!employee){
            throw new HttpException(400,'Employee not found')
        }
        res.status(201).send(employee)
        }
        catch(err){
            console.error('Error:',err)
            next(err)
        }
        
    }

    

    updateEmployee=async(req:Request,res:Response)=>{
        const id =Number(req.params.id)
        const {email,name}=req.body
        await this.employeeService.updateEmployee(id,email,name)
        res.status(200).send()
    }

    deleteEmployee=async(req:Request,res:Response)=>{
        const id =Number(req.params.id)
        await this.employeeService.deleteEmployee(id)
        res.status(200).send()
    }
}

export default EmployeeController