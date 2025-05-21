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
const emailValidator_1 = require("../validators/emailValidator");
class EmployeeController {
    constructor(employeeService, router) {
        this.employeeService = employeeService;
        this.createEmployee = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, age, address } = req.body;
                if (!(0, emailValidator_1.isEmail)(email)) {
                    throw new Error('Add @');
                }
                const newEmployee = yield this.employeeService.createEmployee(email, name, age, address);
                res.status(201).send(newEmployee);
            }
            catch (err) {
                console.log(err);
                next(err);
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