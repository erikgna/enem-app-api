import { IsNotEmpty, Length } from "class-validator";

export class UpdateUserDto {
  @Length(5)
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  correct: boolean;
}
