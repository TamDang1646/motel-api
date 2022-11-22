import {
  BaseEntity,
  Column,
  Entity,
} from "typeorm";

@Entity("token")
export class Token extends BaseEntity {
    @Column("int", { primary: true, name: "id" })
    userId: number;

    // @Property()
    // role: string;
    @Column("varchar", { name: "code" })
    userCode: string;
}