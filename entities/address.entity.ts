import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
class Address extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    line1:string;
    
    @Column()
    pincode:number;

    @OneToOne(()=>Employee,(employee)=> employee.address)
    employee:Employee;

}

export default Address