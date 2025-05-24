import { Request,Response,Router,NextFunction } from "express"
import EmployeeRepository from "../repositories/employee.repository"
import EmployeeService from "../services/employee.service"
import HttpException from "../exception/httpException"
import { isEmail } from "../validators/emailValidator"
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { CreateEmployeeDto } from "../dto/create-employee.dto"
import { authorizationMiddleware } from "../middlewares/authorizationMiddleware"
import { EmployeeRole } from "../entities/employee.entity"
import { LoggerService } from "../services/loggerservice"
import { UpdateEmployeeDto} from "../dto/update-employee.dto"


class EmployeeController{
    private logger=LoggerService.getInstance(EmployeeService.name)
    constructor(private employeeService:EmployeeService,router:Router) {
        router.get('/',authorizationMiddleware([EmployeeRole.HR,EmployeeRole.DEVELOPER]), this.getAllEmployees),
        router.post('/',authorizationMiddleware([EmployeeRole.HR,EmployeeRole.DEVELOPER]),this.createEmployee),
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
        createEmployeeDto
      );
      this.logger.info("Employee Created--")
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
       

    }

    getAllEmployees=async(req:Request,res:Response)=>{
        const employees=await this.employeeService.getAllEmployees()
        this.logger.info("Employees Fetched--")
        res.status(201).send(employees)
    }

    getEmployeeById=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const id =Number(req.params.id)
        const employee=await this.employeeService.getEmployeeById(id)
        if(!employee){
            throw new HttpException(400,'Employee not found')
        }
        this.logger.info("Employee Fetched By Id--")
        res.status(201).send(employee)
        }
        catch(err){
            console.error('Error:',err)
            next(err)
        }
        
    }

    

    updateEmployee=async(req:Request,res:Response,next:NextFunction)=>{
        try{
        const id =Number(req.params.id)
         const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
         updateEmployeeDto.id=id
      const errors = await validate(updateEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }


        await this.employeeService.updateEmployee(updateEmployeeDto)
        this.logger.info("Employee Updated--")
        res.status(200).send()

        }catch(err){
            next(err)
        }
        
    }

    deleteEmployee=async(req:Request,res:Response)=>{
        try{
            const id =Number(req.params.id)
            if(!id){
                throw new HttpException(400,"id not given")
            }
        await this.employeeService.deleteEmployee(id)
        this.logger.info("Employee Deleted--")
        res.status(200).send()
        }catch(err){

        }
        
    }
}

export default EmployeeController