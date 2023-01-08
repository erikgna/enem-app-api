import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  Param,
  Post,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { IHeaders } from "src/interfaces/Headers";
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
    try {
      return this.questionsService.findOne(id);
    } catch (error) {
      throw new HttpException("Ocorreu um erro desconhecido.", 500);
    }
  }

  @Post()
  async findFiltered(
    @Body() filterObjects: IFilter,
    @Headers() headers: IHeaders
  ) {
    let id = null;
    try {
      id = this.jwtService.decode(headers.authorization.split(" ")[1])?.sub;
    } catch (_) {
      id = null;
    }

    try {
      const question = await this.questionsService.findByFilter(
        filterObjects,
        id
      );

      return question;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException("Ocorreu um erro desconhecido.", 500);
    }
  }
}
