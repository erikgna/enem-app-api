import { IAnswers } from 'src/interfaces/Answers';
export declare class Question {
    id: string;
    url: string;
    name: string;
    description: string;
    ask: string;
    answers: IAnswers;
    rightAnswer: string;
}
