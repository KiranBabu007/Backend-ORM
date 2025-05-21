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
const httpException_1 = __importDefault(require("../exception/httpException"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_employee_dto_1 = require("../dto/create-employee.dto");
class EmployeeController {
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        this.createEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createEmployeeDto = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const savedEmployee = yield this.employeeService.createEmployee(createEmployeeDto.email, createEmployeeDto.name, createEmployeeDto.age, createEmployeeDto.address);
                res.status(201).send(savedEmployee);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeService.getAllEmployees();
            res.status(201).send(employees);
        });
        this.getEmployeeById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const employee = yield this.employeeService.getEmployeeById(id);
                if (!employee) {
                    throw new httpException_1.default(400, 'Employee not found');
                }
                res.status(201).send(employee);
            }
            catch (err) {
                console.error('Error:', err);
                next(err);
            }
        });
        this.updateEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { email, name } = req.body;
            yield this.employeeService.updateEmployee(id, email, name);
            res.status(200).send();
        });
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield this.employeeService.deleteEmployee(id);
            res.status(200).send();
        });
        router.get('/', this.getAllEmployees),
            router.post('/', this.createEmployee),
            router.get('/:id', this.getEmployeeById),
            router.put('/:id', this.updateEmployee);
        router.delete('/:id', this.deleteEmployee);
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controllers.js.map