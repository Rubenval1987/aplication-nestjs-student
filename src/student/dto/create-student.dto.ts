import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateStudentDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  mae: string;

  @IsString()
  pai: string;

  @IsString()
  @MinLength(6)
  password;
}
