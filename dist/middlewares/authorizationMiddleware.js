"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationMiddleware = void 0;
const httpException_1 = __importDefault(require("../exception/httpException"));
const authorizationMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        var _a;
        const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        console.log(role);
        if (!allowedRoles.includes(role)) {
            throw new httpException_1.default(404, "User not allowed");
        }
        next();
    };
};
exports.authorizationMiddleware = authorizationMiddleware;
//# sourceMappingURL=authorizationMiddleware.js.map