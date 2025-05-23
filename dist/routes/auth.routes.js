"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const auth_controller_1 = require("../controllers/auth.controller");
const employee_router_1 = require("./employee.router");
const authRouter = (0, express_1.Router)();
const authService = new auth_service_1.AuthService(employee_router_1.employeeService);
new auth_controller_1.AuthController(authService, authRouter);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map