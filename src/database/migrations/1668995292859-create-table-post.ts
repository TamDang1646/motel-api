import {
  MigrationInterface,
  QueryRunner,
  Table,
} from "typeorm";

export class createTablePost1668995292859 implements MigrationInterface {
    name = 'createTablePost1668995292859'

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "post",
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
                        name: "authorId",
                        type: "int",
                        length: "11",
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "500",
                        default: "''"
                    },
                    {
                        name: "detail",
                        type: "text",
                    },
                    {
                        name: "postTime",
                        type: "timestamp",
                        default: "current_timestamp()",
                    },
                    {
                        name: "price",
                        type: "varchar",
                        length: "100",
                        default: "''"
                    },
                    {
                        name: "address",
                        type: "varchar",
                        default: "''",
                    },
                    {
                        name: "postType",
                        type: "int",
                        length: "2",
                        default: 0
                    },
                    {
                        name: "status",
                        type: "int",
                        default: 0,
                        comment: "0: posted | 1: close ",
                    },
                    {
                        name: "image",
                        type: "varchar",
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
                ],
            }),
        );

    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("post");
    }
}
