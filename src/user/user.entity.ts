import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'json', default: [] })
  questions: string[];
}
