import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnAddress1747996370062 implements MigrationInterface {
    name = 'AddColumnAddress1747996370062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD "house_no" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" SET DEFAULT 'TEMP_ID'`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
    }

}
