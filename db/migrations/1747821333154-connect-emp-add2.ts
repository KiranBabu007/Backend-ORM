import { MigrationInterface, QueryRunner } from "typeorm";

export class ConnectEmpAdd21747821333154 implements MigrationInterface {
    name = 'ConnectEmpAdd21747821333154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_f9d306b968b54923539b3936b03"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "employee_id" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME CONSTRAINT "UQ_f9d306b968b54923539b3936b03" TO "UQ_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" TO "UQ_f9d306b968b54923539b3936b03"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "address_id" TO "employee_id"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_f9d306b968b54923539b3936b03" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
