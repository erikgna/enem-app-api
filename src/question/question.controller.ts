import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { QuestionsService } from "./question.service";

export interface IFilter {
  areas: string[];
  years: string[];
}

@Controller("questions")
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly jwtService: JwtService
  ) {}

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.questionsService.findOne(id);
  }

  @Post()
  async findFiltered(@Body() filterObjects: IFilter, @Headers() headers) {
    const id = this.jwtService.decode(headers.authorization.split(" ")[1])?.sub;

    const question = await this.questionsService.findByFilter(
      filterObjects,
      id
    );

    return question;
  }
}
