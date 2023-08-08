import { IsString, IsEmail, Length, IsNumber } from 'class-validator';

export class AuthRegisterDTO {
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
  @Length(6)
  password: string;
}
