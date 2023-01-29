import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "src/question/entity/question.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Users } from "./entity/user.entity";
import { hashSync } from "bcrypt";
import { IServiceResponse } from "src/interfaces/ServiceResponse";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>
  ) {}

  async findOne(email: string): Promise<Users> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserQuestions(id: string) {
    const userQuestions = await this.userRepository.findOne({
      where: { id },
      select: { questions: true },
    });

    const allQuestions = [];

    for (const item of userQuestions.questions) {
      const question = await this.questionRepository.findOne({
        where: { id: item.id },
        select: {
          name: true,
          url: true,
          rightAnswer: true,
        },
      });

      allQuestions.push({
        question,
        correct: item.correct,
      });
    }

    return allQuestions;
  }

  async createUser(user: CreateUserDto): Promise<IServiceResponse> {
    if (user.password !== user.confirmPassword) {
      return { message: "As senhas são diferentes.", status: 400 };
    }

    const existUser = await this.userRepository.count({
      where: { email: user.email },
    });

    if (existUser > 0) {
      return { message: "O email já está em uso.", status: 400 };
    }

    user.password = hashSync(user.password, 10);
    await this.userRepository.save(
      this.userRepository.create({ ...user, questions: [] })
    );

    return { status: 201 };
  }

  async addQuestion(
    newQuestionDto: UpdateUserDto,
    id: string
  ): Promise<IServiceResponse> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    const checkHasId = user.questions.find(
      (item) => item.id === newQuestionDto.id
    );

    if (checkHasId === undefined) {
      user.questions.push(newQuestionDto);
      await this.userRepository.save(user);
    }

    return { status: 200 };
  }

  async eraseHistory(id: string): Promise<IServiceResponse> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    user.questions = [];

    await this.userRepository.save(user);

    return { status: 200 };
  }
}
