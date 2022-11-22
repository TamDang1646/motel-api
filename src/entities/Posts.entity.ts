import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
} from "typeorm";

import { User } from "./User.entity";

@Entity("post")
export class Posts extends BaseEntity {
    @Column("int", { primary: true, generated: "increment", name: "id" })
    id: number;

    @Column("varchar", { unique: true, name: "authorId" })
    authorId: number;

    @Column("varchar", { unique: true, name: "title", length: 500 })
    title: string;

    @Column("varchar", { unique: true, name: "detail" })
    detail: string;

    @Column("varchar", { unique: true, name: "postTime" })
    postTime: number;

    @Column("varchar", { unique: true, name: "price" })
    price: string;

    @Column("varchar", { unique: true, name: "address" })
    address: string;

    @Column("varchar", { unique: true, name: "postType" })
    postType: number;

    @Column("varchar", { unique: true, name: "status" })
    status: number;

    @Column("varchar", { unique: true, name: "image" })
    image: string;

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
}

export class PostEX extends Posts {
    @JoinColumn({ name: 'author' })
    author: User;
}