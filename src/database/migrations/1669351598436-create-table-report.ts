import {
  MigrationInterface,
  QueryRunner,
  Table,
} from "typeorm";

export class createTableReport1669351598436 implements MigrationInterface {
    name = 'createTableReport1669351598436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "report",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        length: "11",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "user_report",
                        type: "int",
                    },
                    {
                        name: "reported_user",
                        type: "int",
                    },
                    {
                        name: "reported_post",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "current_timestamp()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "current_timestamp()",
                    },
                ]

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("report");
    }

}
