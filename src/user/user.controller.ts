import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "src/auth/strategies/jwt-auth.guard";
import { IHeaders } from "src/interfaces/Headers";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Get("/questions")
  @UseGuards(JwtAuthGuard)
  async findOne(@Headers() headers: IHeaders) {
    try {
      const id = this.jwtService.decode(
        headers.authorization.replace("Bearer ", "").replace(" ", "")
      )["sub"];

      return this.userService.findUserQuestions(id);
    } catch (error) {
      throw new HttpException("Ocorreu um erro desconhecido.", 500);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const response = await this.userService.createUser(createUserDto);

      if (response.status > 300) {
        throw new HttpException(response.message, response.status);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException("Ocorreu um erro desconhecido.", 500);
    }
  }

  @Patch("/new-question")
  @UseGuards(JwtAuthGuard)
  async newQuestion(
    @Body() newQuestionDto: UpdateUserDto,
    @Headers() headers: IHeaders
  ) {
    try {
      const id = this.jwtService.decode(
        headers.authorization.replace("Bearer ", "").replace(" ", "")
      )?.sub;

      const response = await this.userService.addQuestion(newQuestionDto, id);

      if (response.status > 300) {
        throw new HttpException(response.message, response.status);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException("Ocorreu um erro desconhecido.", 500);
    }
  }

  @Delete("/erase-history")
  @UseGuards(JwtAuthGuard)
  async eraseHistory(@Headers() headers: IHeaders) {
    try {
      const id = this.jwtService.decode(
        headers.authorization.replace("Bearer ", "").replace(" ", "")
      )?.sub;

      const response = await this.userService.eraseHistory(id);

      if (response.status > 300) {
        throw new HttpException(response.message, response.status);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException("Ocorreu um erro desconhecido.", 500);
    }
  }
}
