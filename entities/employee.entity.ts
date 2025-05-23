import {Column,Entity,JoinColumn,ManyToOne,OneToOne,PrimaryGeneratedColumn } from 'typeorm'
import AbstractEntity from './abstract.entity';
import Address from './address.entity';
import Department from './department.entity';



export enum EmployeeRole {
  UI='UI',
  UX='UX',
  DEVELOPER='DEVELOPER',
  HR = 'HR'
}

export enum EmployeeStatus{
  ACTIVE='ACTIVE', 
  INACTIVE='INACTIVE',
  PROBATION='PROBATION'
}

@Entity()
class Employee extends AbstractEntity {
  @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employeeId:string
 
    @Column({unique:true})
    email: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @OneToOne(() => Address, (address) => address.employee, {
   cascade: true
  })
  address: Address

   @ManyToOne(()=>Department,(department)=>department.employees )
   department:Department

    @Column()
    password:string

    @Column({
      type:'enum',
      enum:EmployeeRole,
      default:EmployeeRole.DEVELOPER
    })

    role:EmployeeRole

    @Column({
      type:'enum',
      enum:EmployeeStatus,
      default:EmployeeStatus.INACTIVE
    })
    status:EmployeeStatus

    @Column()
    experience:number


    @Column()
    dateOfJoining:Date


  }
  
  export default Employee;
  