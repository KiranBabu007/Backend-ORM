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
exports.AddColumnAddress1747996370062 = void 0;
class AddColumnAddress1747996370062 {
    constructor() {
        this.name = 'AddColumnAddress1747996370062';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "house_no" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" DROP DEFAULT`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" SET DEFAULT 'TEMP_ID'`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
        });
    }
}
exports.AddColumnAddress1747996370062 = AddColumnAddress1747996370062;
//# sourceMappingURL=1747996370062-add-column-address.js.map