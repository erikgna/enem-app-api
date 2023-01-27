import { JwtService } from "@nestjs/jwt";
import { IHeaders } from "src/interfaces/Headers";
import { QuestionsService } from "./question.service";
export interface IFilter {
    areas: string[];
    years: string[];
}
export declare class QuestionsController {
    private readonly questionsService;
    private readonly jwtService;
    constructor(questionsService: QuestionsService, jwtService: JwtService);
    findOne(id: string): Promise<import("./entity/question.entity").Question>;
    findFiltered(filterObjects: IFilter, headers: IHeaders): Promise<any>;
}
