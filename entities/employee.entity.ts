import {Column,Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn } from 'typeorm'
import AbstractEntity from './abstract.entity';
import Address from './address.entity';

@Entity()
class Employee extends AbstractEntity {
  @PrimaryGeneratedColumn()
    id: number;
 
    @Column({unique:true})
    email: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @OneToOne(() => Address,(address)=>address.employee,{
       cascade:true,
       onDelete:'CASCADE'
    })
   
    @JoinColumn()
    address:Address

    @Column()
    password:string

  }
  
  export default Employee;
  