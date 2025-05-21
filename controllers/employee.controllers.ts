import { Request,Response } from "express"
import EmployeeRepository from "../repositories/employee.repository"
import EmployeeService from "../services/employee.service"


class EmployeeController{
    constructor(private employeeService:EmployeeService) {}

    async createEmployee(req:Request,res:Response){
        const {email,name}=req.body
        const newEmployee=await this.employeeService.createEmployee(email,name)
        res.status(201).send(newEmployee)

    }

    async getAllEmployees(req:Request,res:Response){
        const employees=await this.employeeService.getAllEmployees()
        res.status(201).send(employees)
    }

    async getEmployeeById(req:Request,res:Response){
        const id =Number(req.params.id)
        const employee=await this.employeeService.getEmployeeById(id)
        res.status(201).send(employee)
    }

    async updateEmployee(req:Request,res:Response){
        const id =Number(req.params.id)
        const {email,name}=req.body
        await this.employeeService.updateEmployee(id,email,name)
        res.status(200).send()
    }

    async deleteEmployee(req:Request,res:Response){
        const id =Number(req.params.id)
        await this.employeeService.deleteEmployee(id)
        res.status(200).send()
    }
}

