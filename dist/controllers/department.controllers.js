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
const loggerservice_1 = require("../services/loggerservice");
const employee_service_1 = __importDefault(require("../services/employee.service"));
class DepartmentController {
    constructor(departmentService, router) {
        this.departmentService = departmentService;
        this.logger = loggerservice_1.LoggerService.getInstance(employee_service_1.default.name);
        this.createDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                if (!name) {
                    throw new httpException_1.default(400, 'Name not provided');
                }
                const savedDepartment = yield this.departmentService.createDepartment(name);
                this.logger.info("Department Created--");
                res.status(201).send(savedDepartment);
            }
            catch (err) {
                next(err);
            }
        });
        this.getAllDepartments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const departments = yield this.departmentService.getAllDepartments();
            this.logger.info("Department Fetched--");
            res.status(201).send(departments);
        });
        this.getDepartmentById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const department = yield this.departmentService.getDepartmentById(id);
                if (!department) {
                    throw new httpException_1.default(400, 'Employee not found');
                }
                this.logger.info("Department Fetched By Id--");
                res.status(201).send(department);
            }
            catch (err) {
                console.error('Error:', err);
                next(err);
            }
        });
        this.updateDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (!id) {
                    throw new httpException_1.default(400, 'Id not found');
                }
                const { name } = req.body;
                yield this.departmentService.updateDepartment(id, name);
                this.logger.info("Department Updated--");
                res.status(200).send();
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (!id) {
                    throw new httpException_1.default(400, 'Id not found');
                }
                yield this.departmentService.deleteDepartment(id);
                this.logger.info("Department Deleted--");
                res.status(200).send();
            }
            catch (err) {
                next(err);
            }
        });
        router.get('/', this.getAllDepartments),
            router.post('/', this.createDepartment),
            router.get('/:id', this.getDepartmentById),
            router.put('/:id', this.updateDepartment),
            router.delete('/:id', this.deleteDepartment);
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department.controllers.js.map