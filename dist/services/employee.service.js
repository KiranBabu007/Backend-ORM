"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_entity_1 = __importDefault(require("../entities/address.entity"));
const employee_entity_1 = __importDefault(require("../entities/employee.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loggerservice_1 = require("./loggerservice");
class EmployeeService {
    constructor(employeeRepository, departmentService) {
        this.employeeRepository = employeeRepository;
        this.departmentService = departmentService;
        this.logger = loggerservice_1.LoggerService.getInstance(EmployeeService.name);
    }
    createEmployee(createEmployeeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, employeeId, name, role, age, dateOfJoining, experience, status, password, departmentId, address } = createEmployeeDto;
            const newAddress = new address_entity_1.default();
            newAddress.line1 = address.line1;
            newAddress.pincode = Number(address.pincode);
            newAddress.line2 = address.line2;
            newAddress.houseNo = address.houseNo;
            const newEmployee = new employee_entity_1.default();
            newEmployee.address = newAddress;
            newEmployee.email = email;
            newEmployee.employeeId = employeeId;
            newEmployee.name = name,
                newEmployee.role = role;
            newEmployee.age = age;
            newEmployee.dateOfJoining = dateOfJoining;
            newEmployee.experience = experience;
            newEmployee.status = status;
            newEmployee.password = yield bcrypt_1.default.hash(password, 10);
            const department = yield this.departmentService.getDepartmentById(departmentId);
            newEmployee.department = department;
            return this.employeeRepository.create(newEmployee);
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findAll();
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let employee = yield this.employeeRepository.findById(id);
            if (!employee) {
                throw new Error("Employee not found");
            }
            return employee;
        });
    }
    getEmployeeByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.employeeRepository.findByEmail(email);
        });
    }
    updateEmployee(updateEmployeeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findById(updateEmployeeDto.id);
            if (!existingEmployee) {
                throw new Error("Employee not found");
            }
            const id = updateEmployeeDto.id;
            const { name, email, role, employeeId, age, status, dateOfJoining, experience, departmentId } = updateEmployeeDto;
            if (name !== undefined)
                existingEmployee.name = name;
            if (email !== undefined)
                existingEmployee.email = email;
            if (role !== undefined)
                existingEmployee.role = role;
            if (employeeId !== undefined)
                existingEmployee.employeeId = employeeId;
            if (age !== undefined)
                existingEmployee.age = age;
            if (experience !== undefined)
                existingEmployee.experience = experience;
            if (status !== undefined)
                existingEmployee.status = status;
            if (dateOfJoining !== undefined)
                existingEmployee.dateOfJoining = dateOfJoining;
            if (departmentId !== undefined) {
                const department = yield this.departmentService.getDepartmentById(departmentId);
                existingEmployee.department = department;
            }
            yield this.employeeRepository.update(id, existingEmployee);
            return existingEmployee;
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeRepository.findById(id);
            if (employee) {
                yield this.employeeRepository.remove(employee);
            }
            // await this.employeeRepository.delete(id)
        });
    }
}
exports.default = EmployeeService;
//# sourceMappingURL=employee.service.js.map