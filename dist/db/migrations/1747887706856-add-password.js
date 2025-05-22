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
exports.AddPassword1747887706856 = void 0;
class AddPassword1747887706856 {
    constructor() {
        this.name = 'AddPassword1747887706856';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE "employee" ADD "password" character varying');
            yield queryRunner.query(`UPDATE "employee" SET "password"='password' WHERE "password" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "password" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
        });
    }
}
exports.AddPassword1747887706856 = AddPassword1747887706856;
//# sourceMappingURL=1747887706856-add-password.js.map