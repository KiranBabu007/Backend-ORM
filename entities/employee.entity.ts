import {Column,Entity,PrimaryGeneratedColumn } from 'typeorm'
import AbstractEntity from './abstract.entity';

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
  }
  
  export default Employee;
  