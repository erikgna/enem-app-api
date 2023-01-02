import { IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto {
  @Length(5)
  @IsNotEmpty()
  id: string;

  @Length(5)
  @IsNotEmpty()
  newQuestion: string;
}
