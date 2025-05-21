"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, req, res, next) => {
    try {
        res.status(500).send({ error: error.message });
    }
    catch (err) {
        next(error);
    }
};
exports.errorMiddleware = errorMiddleware;
exports.default = exports.errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map