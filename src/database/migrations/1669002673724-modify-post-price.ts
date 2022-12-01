import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class modifyPostPrice1669002673724 implements MigrationInterface {
    name = 'modifyPostPrice1669002673724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE post MODIFY COLUMN price int;`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE post MODIFY COLUMN price varchar;`
        )
    }

}
