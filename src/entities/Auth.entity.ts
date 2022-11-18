import {
  BaseEntity,
  Column,
  Entity,
} from "typeorm";

@Entity("auth")
export class Auth extends BaseEntity {
    @Column("int", { primary: true, generated: "increment", name: "id" })
    id: number;

    @Column("varchar", { unique: true, name: "code", length: 12 })
    code: string;

    @Column("varchar", { unique: true, name: "phone_number", length: 50 })
    phoneNumber: string;

    @Column("varchar", {
        name: "password",
        nullable: false,
        length: 100,
    })
    password: string | null;

    @Column("varchar", {
        name: "language",
        length: 12,
        default: "'vi'",
        comment: "vi: Vietnamese | en: English | ...",
    })
    language: string;

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

    // constructor(partial: Partial<Auth>) {
    //     super();
    //     Object.assign(this, partial);
    // }

}
