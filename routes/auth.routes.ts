import { Router } from "express";
import { AuthService } from "../services/auth.service";
import datasource from "../db/data-source";
import EmployeeRepository from "../repositories/employee.repository";
import Employee from "../entities/employee.entity";
import EmployeeService from "../services/employee.service";
import { AuthController } from "../controllers/auth.controller";
import { employeeService } from "./employee.router";



const authRouter= Router();


const authService=new AuthService(employeeService)
new AuthController(authService,authRouter)

export default authRouter
