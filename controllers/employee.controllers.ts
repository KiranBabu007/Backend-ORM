import { Request,Response,Router } from "express"
import EmployeeRepository from "../repositories/employee.repository"
import EmployeeService from "../services/employee.service"


class EmployeeController{
    constructor(private employeeService:EmployeeService,router:Router) {
        router.get('/',this.getAllEmployees),
        router.post('/',this.createEmployee),
        router.get('/:id',this.getEmployeeById),
        router.put('/:id',this.updateEmployee)
        router.delete('/:id',this.deleteEmployee)
    }

     createEmployee=async (req:Request,res:Response)=>{
        const {email,name}=req.body
        const newEmployee=await this.employeeService.createEmployee(email,name)
        res.status(201).send(newEmployee)

    }

    getAllEmployees=async(req:Request,res:Response)=>{
        const employees=await this.employeeService.getAllEmployees()
        res.status(201).send(employees)
    }

    getEmployeeById=async(req:Request,res:Response)=>{
        const id =Number(req.params.id)
        const employee=await this.employeeService.getEmployeeById(id)
        res.status(201).send(employee)
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