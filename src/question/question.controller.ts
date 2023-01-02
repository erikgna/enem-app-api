import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { QuestionsService } from './question.service';

export interface IFilter {
  areas: string[];
  years: string[];
  userQuestions: string[];
}

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Post()
  async findFiltered(@Body() filterObjects: IFilter, @Headers() headers) {
    const authToken = headers.authorization;

    const question = await this.questionsService.findByFilter(filterObjects);

    if (!authToken) return question;
    console.log(this.jwtService.decode(authToken.split('')[1]));
    const id = this.jwtService.decode(authToken.split(' ')[1]).sub;
    await this.userService.addQuestion({
      id,
      newQuestion: question.id,
    });

    return question;
  }
}
