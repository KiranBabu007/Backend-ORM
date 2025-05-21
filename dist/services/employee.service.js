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
class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    createEmployee(email, name, age, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAddress = new address_entity_1.default();
            newAddress.line1 = address.line1;
            newAddress.pincode = Number(address.pincode);
            const newEmployee = new employee_entity_1.default();
            newEmployee.address = newAddress;
            newEmployee.email = email;
            newEmployee.name = name;
            newEmployee.age = age;
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
            return this.employeeRepository.findById(id);
        });
    }
    updateEmployee(id, email, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmployee = yield this.employeeRepository.findById(id);
            if (existingEmployee) {
                existingEmployee.name = name || existingEmployee.name;
                existingEmployee.email = email || existingEmployee.email;
                yield this.employeeRepository.update(id, existingEmployee);
            }
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