import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/question/question.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { Users } from './user.entity';
import { hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

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
      allQuestions.push(
        await this.questionRepository.findOne({
          where: { id: item },
          select: {
            name: true,
          },
        }),
      );
    }

    return allQuestions;
  }

  async createUser(user: CreateUserDto) {
    user.password = hashSync(user.password, 10);
    return this.userRepository.save(this.userRepository.create(user));
  }

  async addQuestion(newQuestionDto: UpdateUserDto) {
    const oldUser = await this.userRepository.findOne({
      where: { id: newQuestionDto.id },
    });

    oldUser.questions.push(newQuestionDto.newQuestion);

    await this.userRepository.save(oldUser);
  }

  async removeQuestion(removeQuestionDto: UpdateUserDto) {
    const oldUser = await this.userRepository.findOne({
      where: { id: removeQuestionDto.id },
    });

    oldUser.questions = oldUser.questions.filter(
      (item) => item !== removeQuestionDto.newQuestion,
    );

    await this.userRepository.save(oldUser);
  }
}
