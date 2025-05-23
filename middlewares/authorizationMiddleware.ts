import { Request,Response,NextFunction } from "express";
import { EmployeeRole } from "../entities/employee.entity";
import HttpException from "../exception/httpException";

export const authorizationMiddleware = (allowedRoles:EmployeeRole[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const role=req.user?.role
        console.log(role)
        if(!allowedRoles.includes(role)){
            throw new HttpException(404,"User not allowed")
        }

        next()

    }
}
