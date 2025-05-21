"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const httpException_1 = __importDefault(require("../exception/httpException"));
const errorMiddleware = (error, req, res, next) => {
    try {
        if (error instanceof httpException_1.default) {
            const status = error.status || 500;
            const message = error.message || "Something went wrong";
            let resbody = { message: message };
            res.status(status).json(resbody);
        }
        else {
            console.error(error.stack);
            res.status(500).send({ error: error.message });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.errorMiddleware = errorMiddleware;
exports.default = exports.errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map