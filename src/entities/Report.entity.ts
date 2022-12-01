import {
  BaseEntity,
  Column,
  Entity,
} from "typeorm";

@Entity("report")
export class Report extends BaseEntity {
    @Column("int", { primary: true, generated: "increment", name: "id" })
    id: number;

    @Column("int", { unique: true, name: "user_report", comment: "User report" })
    userReport: number;

    @Column("int", { unique: true, name: "reported_user", comment: "Reported user", default: 0 })
    reportedUser: number;

    @Column("int", { unique: true, name: "reported_post", comment: "Reported post", default: 0 })
    reportedPost: number;

    @Column("text", { unique: true, name: "note", comment: "Note", default: null })
    note: string;

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

    constructor(partial: Partial<Report>) {
        super();
        Object.assign(this, partial);
    }
}