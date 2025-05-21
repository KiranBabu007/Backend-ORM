import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import Employee from '../entities/employee.entity'
import Address from '../entities/address.entity'
import AbstractEntity from '../entities/abstract.entity'

const datasource=new DataSource({
    type:"postgres",
    host:"localhost",
    port:5441,
    database:"training",
    username:"postgres",
    password:"postgres",
    extra: { max:5,min:2},
    synchronize: false,
    logging:true,
    namingStrategy:new SnakeNamingStrategy,
    entities: [Employee,Address,AbstractEntity],
    migrations:["dist/db/migrations/*.js"]
})

export default datasource