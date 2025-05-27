import { DataSource } from 'typeorm';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import Employee from '../../entities/employee.entity';
import Department from '../../entities/department.entity'; // Add Department import
import EmployeeRepository from '../../repositories/employee.repository';
import Address from '../../entities/address.entity';
import { EmployeeRole, EmployeeStatus } from '../../entities/employee.entity';
import AbstractEntity from '../../entities/abstract.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

describe('EmployeeRepository', () => {
  let container: StartedPostgreSqlContainer;
  let dataSource: DataSource;
  let employeeRepository: EmployeeRepository;

  beforeAll(async () => {
    try {
   
      container = await new PostgreSqlContainer()
        .withDatabase('test_db')
        .withUsername('test_user')
        .withPassword('test_password')
        .start();

   
      dataSource = new DataSource({
        type: 'postgres',
        host: container.getHost(),
        port: container.getPort(),
        username: container.getUsername(),
        password: container.getPassword(),
        database: container.getDatabase(),
        entities: [Employee, Address, Department, AbstractEntity], 
        synchronize: true, 
        namingStrategy: new SnakeNamingStrategy(),
      });

      await dataSource.initialize();
      
      const typeormRepository = dataSource.getRepository(Employee);
      employeeRepository = new EmployeeRepository(typeormRepository);
    } catch (error) {
      console.error('Test setup failed:', error);
      if (container) {
        await container.stop();
      }
      throw error;
    }
  });

  afterAll(async () => {
    try {
      if (dataSource?.isInitialized) {
        await dataSource.destroy();
      }
      if (container) {
        await container.stop();
      }
    } catch (error) {
      console.error('Cleanup failed:', error);
    }
  });

  describe('find', () => {
    it('should return all employees with their addresses', async () => {
      const employee = {
        name: 'John Doe',
        age: 25,
        email: 'john@example.com',
        password: 'hashedPassword',
        role: EmployeeRole.DEVELOPER,
        status: EmployeeStatus.ACTIVE,
        employeeId: 'EMP001',
        experience: 2,
        dateOfJoining: new Date(),
        address: {
          line1: '123 Main St',
          pincode: 12345,
          houseNo: 42,
          line2: 'Test Area'
        }
      } as Employee;

      await employeeRepository.create(employee);

      const result = await employeeRepository.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        name: 'John Doe',
        email: 'john@example.com',
        address: {
          line1: '123 Main St',
          pincode: 12345
        }
      });
    });
  });
});