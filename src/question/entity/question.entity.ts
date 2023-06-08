import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Question {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: true, default: "" })
  url: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "jsonb" })
  answers: any;

  @Column({ type: "varchar", length: 255, default: "" })
  rightanswer: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  ask: string;
}
