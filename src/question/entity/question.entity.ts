import { IAnswers } from "src/interfaces/Answers";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column("longtext")
  description: string;

  @Column("longtext")
  ask: string;

  @Column({ type: "json" })
  answers: IAnswers;

  @Column()
  rightAnswer: string;
}
