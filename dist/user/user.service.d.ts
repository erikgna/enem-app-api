import { Question } from 'src/question/question.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { Users } from './user.entity';
export declare class UserService {
    private userRepository;
    private questionRepository;
    constructor(userRepository: Repository<Users>, questionRepository: Repository<Question>);
    findAll(): Promise<Users[]>;
    findOne(email: string): Promise<Users>;
    findUserQuestions(id: string): Promise<any[]>;
    createUser(user: CreateUserDto): Promise<Users>;
    addQuestion(newQuestionDto: UpdateUserDto): Promise<void>;
    removeQuestion(removeQuestionDto: UpdateUserDto): Promise<void>;
}
