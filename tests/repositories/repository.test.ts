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

  describe('create', () => {
    it('should create an employee with address', async () => {
      const employee = {
        name: 'Jane Smith',
        age: 30,
        email: 'jane@example.com',
        password: 'hashedPassword',
        role: EmployeeRole.DEVELOPER,
        status: EmployeeStatus.ACTIVE,
        employeeId: 'EMP002',
        experience: 5,
        dateOfJoining: new Date(),
        address: {
          line1: '456 Oak St',
          pincode: 67890,
          houseNo: 15,
          line2: 'Suite 2B'
        }
      } as Employee;

      const result = await employeeRepository.create(employee);

      expect(result.id).toBeDefined();
      expect(result.name).toBe('Jane Smith');
      expect(result.address.line1).toBe('456 Oak St');
    });
  });

  describe('findById', () => {
    it('should find employee by id', async () => {
      // First create an employee
      const employee = {
        name: 'Bob Wilson',
        email: 'bob@example.com',
        age: 28,
        password: 'hashedPassword',
        role: EmployeeRole.HR,
        status: EmployeeStatus.ACTIVE,
        employeeId: 'EMP003',
        experience: 3,
        dateOfJoining: new Date(),
        address: {
          line1: '789 Pine St',
          pincode: 54321,
          houseNo: 7,
          line2: 'Floor 3'
        }
      } as Employee;

      const created = await employeeRepository.create(employee);
      const found = await employeeRepository.findById(created.id);

      expect(found).toBeDefined();
      expect(found.name).toBe('Bob Wilson');
      expect(found.email).toBe('bob@example.com');
    });

    it('should return null for non-existent id', async () => {
      const found = await employeeRepository.findById(99999);
      expect(found).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should find employee by email', async () => {
      const email = 'alice@example.com';
      const employee = {
        name: 'Alice Brown',
        email,
        age: 32,
        password: 'hashedPassword',
        role: EmployeeRole.DEVELOPER,
        status: EmployeeStatus.ACTIVE,
        employeeId: 'EMP004',
        experience: 7,
        dateOfJoining: new Date(),
        address: {
          line1: '321 Elm St',
          pincode: 98765,
          houseNo: 22,
          line2: 'Apt 4C'
        }
      } as Employee;

      await employeeRepository.create(employee);
      const found = await employeeRepository.findByEmail(email);

      expect(found).toBeDefined();
      expect(found.email).toBe(email);
      expect(found.name).toBe('Alice Brown');
    });
  });

  describe('update', () => {
    it('should update employee details', async () => {
      const employee = {
        name: 'Charlie Davis',
        email: 'charlie@example.com',
        age: 35,
        password: 'hashedPassword',
        role: EmployeeRole.DEVELOPER,
        status: EmployeeStatus.ACTIVE,
        employeeId: 'EMP005',
        experience: 8,
        dateOfJoining: new Date(),
        address: {
          line1: '741 Maple St',
          pincode: 45678,
          houseNo: 12,
          line2: 'Unit 5D'
        }
      } as Employee;

      const created = await employeeRepository.create(employee);

      const updates = {
        name: 'Charlie Brown Davis',
        role: EmployeeRole.HR,
        experience: 10
      } as Employee;

      await employeeRepository.update(created.id, updates);

      const updated = await employeeRepository.findById(created.id);
      expect(updated.name).toBe('Charlie Brown Davis');
      expect(updated.role).toBe(EmployeeRole.HR);
      expect(updated.experience).toBe(10);
     
      expect(updated.email).toBe('charlie@example.com');
    });
  });

  describe('delete', () => {
    it('should delete employee by id', async () => {
      const employee = {
        name: 'David Miller',
        email: 'david@example.com',
        age: 29,
        password: 'hashedPassword',
        role: EmployeeRole.DEVELOPER,
        status: EmployeeStatus.ACTIVE,
        employeeId: 'EMP006',
        experience: 4,
        dateOfJoining: new Date(),
        address: {
          line1: '852 Cedar St',
          pincode: 32145,
          houseNo: 9,
          line2: 'Block A'
        }
      } as Employee;

      const created = await employeeRepository.create(employee);
      await employeeRepository.delete(created.id);

      const found = await employeeRepository.findById(created.id);
      expect(found).toBeNull();
    });
  });

  
});