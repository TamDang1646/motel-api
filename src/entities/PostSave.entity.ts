import {
  BaseEntity,
  Column,
  Entity,
} from "typeorm";

@Entity("post_save")
export class PostSave extends BaseEntity {
    @Column("int", { primary: true, generated: "increment", name: "id" })
    id: number;

    @Column("int", { unique: true, name: "user_id" })
    userId: number;

    @Column("int", { unique: true, name: "post_id" })
    postId: number;


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

    constructor(partial: Partial<PostSave>) {
        super();
        Object.assign(this, partial);
    }
}