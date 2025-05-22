import { NextFunction, Request,Response,Router } from "express";
import { AuthService } from "../services/auth.service";
import HttpException from "../exception/httpException";


export class AuthController{
 constructor(private authService:AuthService,
    private router:Router
 ){
    router.post("/login",this.login)
 }

 login=async(req:Request,res:Response,next:NextFunction)=>{

    try{
         const {email,password}= req.body

    if(!email||!password){
        throw new HttpException(400,"Email or password not given")
    }

    const auth=await this.authService.login(email,password)

    res.status(200).send(auth)
    }catch(error){
        next(error)
    }
   
 }
}