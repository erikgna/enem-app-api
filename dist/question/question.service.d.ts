import { Repository } from 'typeorm';
import { IFilter } from './question.controller';
import { Question } from './question.entity';
export declare class QuestionsService {
    private questionsRepository;
    constructor(questionsRepository: Repository<Question>);
    findAll(): Promise<Question[]>;
    findOne(url: string): Promise<Question>;
    findByFilter(filter: IFilter): Promise<Question>;
}
