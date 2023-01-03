import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "src/question/question.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";
import { Users } from "./user.entity";
import { hashSync } from "bcrypt";

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

  async createUser(user: CreateUserDto) {
    user.password = hashSync(user.password, 10);
    return this.userRepository.save(this.userRepository.create(user));
  }

  async addQuestion(newQuestionDto: UpdateUserDto, id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    user.questions.push(newQuestionDto);

    await this.userRepository.save(user);
  }

  async eraseHistory(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    user.questions = [];

    await this.userRepository.save(user);
  }
}
