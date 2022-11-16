import {
  MigrationInterface,
  QueryRunner,
  Table,
} from "typeorm";

export class CreateUserTable1620123949296 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    // {
                    //     name: "id",
                    //     type: "int",
                    //     length: "11",
                    //     isPrimary: true,
                    //     isGenerated: true,
                    //     generationStrategy: "increment"
                    // },
                    {
                        name: "id",
                        type: "int",
                        length: "11",
                        isPrimary: true,
                    },
                    {
                        name: "code",
                        type: "varchar",
                        length: "12",
                        isUnique: true
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        length: "50",
                        isUnique: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                        isNullable: true,
                        default: "'New User'",
                    },
                    {
                        name: "gender",
                        type: "tinyint",
                        isNullable: true,
                        default: 0,
                        comment: "0: male | 1: female | 2: other",
                    },
                    {
                        name: "language",
                        type: "varchar",
                        length: "12",
                        default: "'vi'",
                        comment: "vi: Vietnamese | en: English | ...",
                    },
                    {
                        name: "birthday",
                        type: "date",
                        isNullable: true,
                    },
                    {
                        name: "status",
                        type: "int",
                        default: 0,
                        comment: "0: inactive| 1: active| 2: block| 3: delete",
                    },
                    {
                        name: "avatar",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "total_post",
                        type: "int",
                        isNullable: true,
                        default: 0,
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
        await queryRunner.dropTable("user");
    }
}
