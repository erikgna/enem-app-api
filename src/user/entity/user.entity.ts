import { Length } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UpdateUserDto } from "../dto/update-user.dto";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  @Length(3)
  fullName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  @Length(6)
  password: string;

  @Column({ type: "json", default: [] })
  questions: UpdateUserDto[];
}
