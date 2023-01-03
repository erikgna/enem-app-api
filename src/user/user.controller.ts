import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "src/auth/strategies/jwt-auth.guard";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { UserService } from "./user.service";

@Controller("users")
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @Get("/questions")
  async findOne(@Headers() headers) {
    const id = this.jwtService.decode(headers.authorization.split(" ")[1]).sub;
    return this.userService.findUserQuestions(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch("/new-question")
  async newQuestion(@Body() newQuestionDto: UpdateUserDto, @Headers() headers) {
    const id = this.jwtService.decode(headers.authorization.split(" ")[1]).sub;
    return this.userService.addQuestion(newQuestionDto, id);
  }

  @Delete("/erase-history")
  async eraseHistory(@Headers() headers) {
    const id = this.jwtService.decode(headers.authorization.split(" ")[1]).sub;
    return this.userService.eraseHistory(id);
  }
}
