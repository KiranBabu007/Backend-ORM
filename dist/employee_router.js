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
const express_1 = __importDefault(require("express"));
const employee_entity_1 = __importDefault(require("./entities/employee.entity"));
const data_source_1 = __importDefault(require("./db/data-source"));
const employeeRouter = express_1.default.Router();
employeeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employees = yield employeeRepository.find();
    res.status(200).send(employees);
}));
employeeRouter.get("/:empId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { empId } = req.params;
    console.log(req.params);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employees = yield employeeRepository.findOneBy({ id: Number(empId) });
    res.status(200).send(employees);
}));
employeeRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const newEmployee = new employee_entity_1.default();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name;
    employeeRepository.insert(newEmployee);
    res.status(201).send(newEmployee);
}));
employeeRouter.delete("/:empId", (req, res) => {
    const { empId } = req.params;
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    employeeRepository.delete({ id: Number(empId) });
    res.status(204).send();
});
employeeRouter.put("/:empId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { empId } = req.params;
    const { name, email } = req.body;
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employee = yield employeeRepository.findOneBy({ id: Number(empId) });
    employee.name = name;
    employee.email = email;
    employeeRepository.save(employee);
    res.status(200).send("Put successfull");
}));
employeeRouter.patch("/:empId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { empId } = req.params;
    const { name, email } = req.body;
    const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
    const employee = yield employeeRepository.findOneBy({ id: Number(empId) });
    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employeeRepository.save(employee);
    res.status(200).send("Patch successfull");
}));
exports.default = employeeRouter;
//# sourceMappingURL=employee_router.js.map