import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
  @Length(3)
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @Length(6)
  @IsNotEmpty()
  password: string;

  @Length(6)
  @IsNotEmpty()
  confirmPassword: string;
}
