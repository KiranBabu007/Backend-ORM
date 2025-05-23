import { Request,Response,Router,NextFunction } from "express"

import HttpException from "../exception/httpException"
import DepartmentService from "../services/department.service"
import { LoggerService } from "../services/loggerservice"
import EmployeeService from "../services/employee.service"


class DepartmentController{
    private logger=LoggerService.getInstance(EmployeeService.name)

    constructor(private departmentService:DepartmentService,router:Router) {
        router.get('/',this.getAllDepartments),
        router.post('/',this.createDepartment),
        router.get('/:id',this.getDepartmentById),
        router.put('/:id',this.updateDepartment),
        router.delete('/:id',this.deleteDepartment)
    }

    

     createDepartment=async (req:Request,res:Response,next:NextFunction)=>{
        try{
             const {name}=req.body
             if(!name){
                throw new HttpException(400,'Name not provided')
             }
      const savedDepartment = await this.departmentService.createDepartment(name)
      this.logger.info("Department Created--")
      res.status(201).send(savedDepartment);
        }catch(err){
            next(err)
        }

     

    }

    getAllDepartments=async(req:Request,res:Response)=>{
        const departments=await this.departmentService.getAllDepartments()
        this.logger.info("Department Fetched--")
        res.status(201).send(departments)
    }

    getDepartmentById=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const id =Number(req.params.id)
        const department=await this.departmentService.getDepartmentById(id)
        if(!department){
            throw new HttpException(400,'Employee not found')
        }
        this.logger.info("Department Fetched By Id--")
        res.status(201).send(department)
        }
        catch(err){
            console.error('Error:',err)
            next(err)
        }
        
    }

    updateDepartment=async(req:Request,res:Response,next:NextFunction)=>{
        try{const id =Number(req.params.id)
         if(!id){
            throw new HttpException(400,'Id not found')
        }
        const {name}=req.body
        await this.departmentService.updateDepartment(id,name)
        this.logger.info("Department Updated--")
        res.status(200).send()
    }
    catch(err){
        next(err)
    }
    }

    deleteDepartment=async(req:Request,res:Response,next:NextFunction)=>{
        try{
        const id =Number(req.params.id)
        if(!id){
            throw new HttpException(400,'Id not found')
        }

        await this.departmentService.deleteDepartment(id)
        this.logger.info("Department Deleted--")
        res.status(200).send()
        }catch(err){

            next(err)

        }
       
    }


}

export default DepartmentController