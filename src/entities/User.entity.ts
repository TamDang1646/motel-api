import {
  BaseEntity,
  Column,
  Entity,
} from "typeorm";

@Entity("user")
export class User extends BaseEntity {

    @Column("int", { primary: true, name: "id" })
    id: number;

    @Column("varchar", { unique: true, name: "code", length: 12 })
    code: string;

    @Column("varchar", { unique: true, name: "phone_number", length: 50 })
    phoneNumber: string;

    @Column("varchar", {
        name: "email",
        nullable: true,
        length: 100,
        default: "''",
    })
    email: string | null;

    @Column("varchar", {
        name: "name",
        nullable: true,
        length: 100,
        default: "''",
    })
    name: string | null;

    @Column("tinyint", {
        name: "gender",
        default: 0,
        comment: "0: other | 1: male | 2: female",
    })
    gender: number;

    @Column("varchar", {
        name: "language",
        length: 12,
        default: "'vi'",
        comment: "vi: Vietnamese | en: English | ...",
    })
    language: string;

    @Column("date", { name: "birthday", nullable: true })
    birthday: string | null;

    @Column("int", {
        name: "status",
        comment: "0: inactive| 1: active| 2: block| 3: delete",
        default: () => 0,
    })
    status: number;

    @Column("varchar", {
        name: "avatar",
        nullable: true,
        length: 255,
        default: "''",
    })
    avatar: string | null;

    @Column("varchar", {
        name: "address",
        nullable: true,
        length: 255,
        default: "''",
    })
    address: string | null;

    @Column("varchar", {
        name: "total_post",
        length: 255,
        default: "0",
    })
    totalPost: number;

    @Column("timestamp", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @Column("timestamp", {
        name: "updated_at",
        default: () => "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
    constructor(partial: Partial<User>) {
        super();
        Object.assign(this, partial);
    }}
