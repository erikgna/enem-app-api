import { Question } from "src/question/entity/question.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Users } from "./entity/user.entity";
import { IServiceResponse } from "src/interfaces/ServiceResponse";
export declare class UserService {
    private userRepository;
    private questionRepository;
    constructor(userRepository: Repository<Users>, questionRepository: Repository<Question>);
    findOne(email: string): Promise<Users>;
    findUserQuestions(id: string): Promise<any[]>;
    createUser(user: CreateUserDto): Promise<IServiceResponse>;
    addQuestion(newQuestionDto: UpdateUserDto, id: string): Promise<IServiceResponse>;
    eraseHistory(id: string): Promise<IServiceResponse>;
}
