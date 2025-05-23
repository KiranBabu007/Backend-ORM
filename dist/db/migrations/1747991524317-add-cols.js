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
exports.AddCols1747991524317 = void 0;
class AddCols1747991524317 {
    constructor() {
        this.name = 'AddCols1747991524317';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying NOT NULL DEFAULT 'TEMP_ID'`);
            yield queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'INACTIVE'`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer NOT NULL DEFAULT 0`);
            yield queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" TIMESTAMP NOT NULL DEFAULT now()`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
            yield queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
        });
    }
}
exports.AddCols1747991524317 = AddCols1747991524317;
//# sourceMappingURL=1747991524317-add-cols.js.map