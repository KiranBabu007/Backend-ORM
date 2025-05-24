import express from "express";
import employeeRouter from "./routes/employee.router"
import loggerMiddleware from "./middlewares/loggerMiddleware";
import datasource from "./db/data-source";
import errorMiddleware from "./middlewares/errorMiddleware";
import departmentRouter from "./routes/department.router";

import { authMiddleware } from "./middlewares/authMiddleware";
import { LoggerService } from "./services/loggerservice";
import authRouter from "./routes/auth.routes";

const server = express();

const logger = LoggerService.getInstance('app()');
server.use(express.json());
server.use(loggerMiddleware);

server.use("/employee",authMiddleware,employeeRouter);
server.use('/department',departmentRouter)
server.use('/auth',authRouter)
server.use(errorMiddleware)

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello world typescript");
});


(async()=>{
  try{
    await datasource.initialize();
    console.log("Connected")
    server.listen(3003, () => {
    console.log("server listening to 3003");
});
  }catch{
    console.error("Failed to connect to DB")
    process.exit(1);
  }

  
})();
