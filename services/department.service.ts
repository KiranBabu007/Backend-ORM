import Department from "../entities/department.entity";
import DepartmentRepository from "../repositories/department.repository";




class DepartmentService{
    constructor(private departmentRepository:DepartmentRepository){}

    async createDepartment(name:string){
        const newDept=new Department()

        newDept.name=name

        return this.departmentRepository.create(newDept)

    }

    async getAllDepartments():Promise<Department[]>{
        return this.departmentRepository.findAll()
    }

    async getDepartmentById(id:number):Promise<Department>{
        return this.departmentRepository.findById(id)
    }

    async updateDepartment(id:number,name:string){
        const existingDepartment=await this.departmentRepository.findById(id);
        if(existingDepartment){
            existingDepartment.name=name || existingDepartment.name
            
            await this.departmentRepository.update(id,existingDepartment)
        }
    }

    async deleteDepartment(id:number){     
        await this.departmentRepository.delete(id)

    }
        


}

export default DepartmentService