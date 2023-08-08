import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'student' })
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  @IsEmail()
  email: string;

  @Column({ length: 500 })
  mae: string;

  @Column({ length: 500 })
  pai: string;

  @Column({ length: 500 })
  password: string;
}
