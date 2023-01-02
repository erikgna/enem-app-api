import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { QuestionsService } from './question.service';
export interface IFilter {
    areas: string[];
    years: string[];
    userQuestions: string[];
}
export declare class QuestionsController {
    private readonly questionsService;
    private readonly userService;
    private readonly jwtService;
    constructor(questionsService: QuestionsService, userService: UserService, jwtService: JwtService);
    findAll(): Promise<import("./question.entity").Question[]>;
    findOne(id: string): Promise<import("./question.entity").Question>;
    findFiltered(filterObjects: IFilter, headers: any): Promise<import("./question.entity").Question>;
}
