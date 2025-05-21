
import express from 'express'

import dataSource from '../db/data-source';
import Employee from '../entities/employee.entity';

import DepartmentRepository from '../repositories/department.repository';
import DepartmentService from '../services/department.service';
import DepartmentController from '../controllers/department.controllers';

const departmentRouter=express.Router();

const  departmentRepository=new DepartmentRepository(dataSource.getRepository(Employee))
const departmentService = new DepartmentService(departmentRepository)
const departmentController = new DepartmentController(departmentService,departmentRouter)

export default departmentRouter
