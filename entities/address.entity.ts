import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
class Address extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    line1:string;

    @Column()
    line2:string

    @Column()
    houseNo:number
    
    @Column()
    pincode:number;

    @OneToOne(() => Employee, (employee) => employee.address, {
     onDelete: 'CASCADE'
    })
    @JoinColumn()
    employee: Employee;



}

export default Address