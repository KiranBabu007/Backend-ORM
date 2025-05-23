import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCols1747991524317 implements MigrationInterface {
    name = 'AddCols1747991524317'

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying NOT NULL DEFAULT 'TEMP_ID'`);
    await queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
    await queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'INACTIVE'`);
    await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer NOT NULL DEFAULT 0`);
    await queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
    }

}
