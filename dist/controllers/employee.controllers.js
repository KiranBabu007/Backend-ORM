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
const employee_service_1 = __importDefault(require("../services/employee.service"));
const httpException_1 = __importDefault(require("../exception/httpException"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_employee_dto_1 = require("../dto/create-employee.dto");
const authorizationMiddleware_1 = require("../middlewares/authorizationMiddleware");
const employee_entity_1 = require("../entities/employee.entity");
const loggerservice_1 = require("../services/loggerservice");
const update_employee_dto_1 = require("../dto/update-employee.dto");
class EmployeeController {
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        this.logger = loggerservice_1.LoggerService.getInstance(employee_service_1.default.name);
        this.createEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createEmployeeDto = (0, class_transformer_1.plainToInstance)(create_employee_dto_1.CreateEmployeeDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const savedEmployee = yield this.employeeService.createEmployee(createEmployeeDto);
                this.logger.info("Employee Created--");
                res.status(201).send(savedEmployee);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllEmployees = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.employeeService.getAllEmployees();
            this.logger.info("Employees Fetched--");
            res.status(201).send(employees);
        });
        this.getEmployeeById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const employee = yield this.employeeService.getEmployeeById(id);
                if (!employee) {
                    throw new httpException_1.default(400, 'Employee not found');
                }
                this.logger.info("Employee Fetched By Id--");
                res.status(201).send(employee);
            }
            catch (err) {
                console.error('Error:', err);
                next(err);
            }
        });
        this.updateEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const updateEmployeeDto = (0, class_transformer_1.plainToInstance)(update_employee_dto_1.UpdateEmployeeDto, req.body);
                updateEmployeeDto.id = id;
                const errors = yield (0, class_validator_1.validate)(updateEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                yield this.employeeService.updateEmployee(updateEmployeeDto);
                this.logger.info("Employee Updated--");
                res.status(200).send();
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (!id) {
                    throw new httpException_1.default(400, "id not given");
                }
                yield this.employeeService.deleteEmployee(id);
                this.logger.info("Employee Deleted--");
                res.status(200).send();
            }
            catch (err) {
            }
        });
        router.get('/', (0, authorizationMiddleware_1.authorizationMiddleware)([employee_entity_1.EmployeeRole.HR, employee_entity_1.EmployeeRole.DEVELOPER]), this.getAllEmployees),
            router.post('/', (0, authorizationMiddleware_1.authorizationMiddleware)([employee_entity_1.EmployeeRole.HR, employee_entity_1.EmployeeRole.DEVELOPER]), this.createEmployee),
            router.get('/:id', this.getEmployeeById),
            router.put('/:id', this.updateEmployee);
        router.delete('/:id', this.deleteEmployee);
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=employee.controllers.js.map