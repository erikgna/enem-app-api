import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @Length(5)
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @Length(6)
  @IsNotEmpty()
  password: string;
}
