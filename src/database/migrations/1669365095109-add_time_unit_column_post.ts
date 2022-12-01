import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class addTimeUnitColumnPost1669365095109 implements MigrationInterface {
    name = 'addTimeUnitColumnPost1669365095109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE post ADD COLUMN time_unit INT DEFAULT 0`);
        queryRunner.query(`ALTER TABLE post ADD COLUMN min_price INT DEFAULT 0`);
        queryRunner.query(`ALTER TABLE post ADD COLUMN max_price INT DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`ALTER TABLE post DROP COLUMN time_unit`);
        queryRunner.query(`ALTER TABLE post DROP COLUMN min_price`);
        queryRunner.query(`ALTER TABLE post DROP COLUMN max_price`);
    }

}
