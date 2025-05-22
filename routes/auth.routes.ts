import { Router } from "express";
import { AuthService } from "../services/auth.service";
import datasource from "../db/data-source";
import EmployeeRepository from "../repositories/employee.repository";
import Employee from "../entities/employee.entity";
import EmployeeService from "../services/employee.service";
import { AuthController } from "../controllers/auth.controller";



const authRouter= Router();

const repository=datasource.getRepository(Employee)
const employeeRepository= new EmployeeRepository(repository)
const employeeService = new EmployeeService(employeeRepository)

const authService = new AuthService(employeeService)


new AuthController(authService,authRouter)

export default authRouter
