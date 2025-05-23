import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCols1747992847959 implements MigrationInterface {
    name = 'AddCols1747992847959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" SET DEFAULT 'TEMP_ID'`);
    }

}
