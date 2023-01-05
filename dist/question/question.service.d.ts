import { Users } from "src/user/user.entity";
import { Repository } from "typeorm";
import { IFilter } from "./question.controller";
import { Question } from "./question.entity";
export declare class QuestionsService {
    private questionsRepository;
    private usersRepository;
    constructor(questionsRepository: Repository<Question>, usersRepository: Repository<Users>);
    findOne(url: string): Promise<Question>;
    findByFilter(filter: IFilter, id: string): Promise<Question>;
}
