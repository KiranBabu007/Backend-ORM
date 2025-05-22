import { Request,Response,Router,NextFunction } from "express"

import HttpException from "../exception/httpException"
import DepartmentService from "../services/department.service"


class DepartmentController{
    constructor(private departmentService:DepartmentService,router:Router) {
        router.get('/',this.getAllDepartments),
        router.post('/',this.createDepartment),
        router.get('/:id',this.getDepartmentById),
        router.put('/:id',this.updateDepartment)
        router.delete('/:id',this.deleteDepartment)
    }

     createDepartment=async (req:Request,res:Response,next:NextFunction)=>{

      const {name}=req.body
      const savedDepartment = await this.departmentService.createDepartment(name)
        
 
      res.status(201).send(savedDepartment);
  
       

    }

    getAllDepartments=async(req:Request,res:Response)=>{
        const departments=await this.departmentService.getAllDepartments()
        res.status(201).send(departments)
    }

    getDepartmentById=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const id =Number(req.params.id)
        const department=await this.departmentService.getDepartmentById(id)
        if(!department){
            throw new HttpException(400,'Employee not found')
        }
        res.status(201).send(department)
        }
        catch(err){
            console.error('Error:',err)
            next(err)
        }
        
    }

    updateDepartment=async(req:Request,res:Response)=>{
        const id =Number(req.params.id)
        const {name}=req.body
        await this.departmentService.updateDepartment(id,name)
        res.status(200).send()
    }

    deleteDepartment=async(req:Request,res:Response)=>{
        const id =Number(req.params.id)
        await this.departmentService.deleteDepartment(id)
        res.status(200).send()
    }
}

export default DepartmentController