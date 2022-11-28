import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class alterReportAddNote1669628705970 implements MigrationInterface {
    name = 'alterReportAddNote1669628705970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE report ADD COLUMN note TEXT DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE report DROP COLUMN note`);
    }

}
