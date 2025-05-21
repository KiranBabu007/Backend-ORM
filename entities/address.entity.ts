import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import AbstractEntity from "./abstract.entity";

@Entity()
class Address extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    line1:string;
    
    @Column()
    pincode:number;

}

export default Address