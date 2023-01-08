import { IsNotEmpty, IsString } from "class-validator";

export class CreateReportDto {
  @IsString()
  msg?: string;

  @IsNotEmpty()
  id: string;
}
