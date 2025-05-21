import { NextFunction,Request,Response} from 'express'


export const errorMiddleware = (error:Error,req:Request,res:Response,next: NextFunction)=>{
    try{
        
        res.status(500).send({error:error.message})
    } catch(err){
        next(error)
    }
}

export default errorMiddleware
