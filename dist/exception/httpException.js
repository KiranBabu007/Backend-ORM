"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = this.message;
    }
}
exports.default = HttpException;
//# sourceMappingURL=httpException.js.map