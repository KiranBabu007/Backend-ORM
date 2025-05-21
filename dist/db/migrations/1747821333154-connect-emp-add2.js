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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectEmpAdd21747821333154 = void 0;
class ConnectEmpAdd21747821333154 {
    constructor() {
        this.name = 'ConnectEmpAdd21747821333154';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_f9d306b968b54923539b3936b03"`);
            yield queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "employee_id" TO "address_id"`);
            yield queryRunner.query(`ALTER TABLE "employee" RENAME CONSTRAINT "UQ_f9d306b968b54923539b3936b03" TO "UQ_2a4f5082f1be346e2b8cdec2194"`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
            yield queryRunner.query(`ALTER TABLE "employee" RENAME CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" TO "UQ_f9d306b968b54923539b3936b03"`);
            yield queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "address_id" TO "employee_id"`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_f9d306b968b54923539b3936b03" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.ConnectEmpAdd21747821333154 = ConnectEmpAdd21747821333154;
//# sourceMappingURL=1747821333154-connect-emp-add2.js.map