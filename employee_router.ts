import express from "express";
import Employee from "./employee.entity";
import datasource from "./data-source";
import { Entity } from "typeorm";


const employeeRouter = express.Router();



employeeRouter.get("/", async (req, res) => {
  const employeeRepository= datasource.getRepository(Employee);
  const employees = await employeeRepository.find()
  res.status(200).send(employees);
});

employeeRouter.get("/:empId", async (req, res) => {
  const {empId} =req.params
  console.log(req.params)
  const employeeRepository= datasource.getRepository(Employee);
  const employees = await employeeRepository.findOneBy({id:Number(empId)})
  res.status(200).send(employees);
});


employeeRouter.post("/", async (req, res) => {

  console.log(req.body);
  const employeeRepository= datasource.getRepository(Employee);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;

  employeeRepository.insert(newEmployee)
  
  res.status(201).send(newEmployee);
  
});

employeeRouter.delete("/:empId", (req, res) => {
  const {empId} =req.params
  const employeeRepository= datasource.getRepository(Employee);
  employeeRepository.delete({id:Number(empId)})
  res.status(204).send();
});

employeeRouter.put("/:empId",async (req, res) => {
   const {empId} =req.params
  const {name,email} = req.body;
  const employeeRepository= datasource.getRepository(Employee);
  const employee= await employeeRepository.findOneBy({id:Number(empId)})
  employee.name=name
  employee.email=email
  employeeRepository.save(employee)
  res.status(200).send("Put successfull");
});

employeeRouter.patch("/:empId",async (req, res) => {
   const {empId} =req.params
  const {name,email} = req.body;
  const employeeRepository= datasource.getRepository(Employee);
  const employee= await employeeRepository.findOneBy({id:Number(empId)})
  employee.name=name || employee.name
  employee.email=email || employee.email
  employeeRepository.save(employee)
  res.status(200).send("Patch successfull");
});

export default employeeRouter;
