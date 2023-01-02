"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const question_entity_1 = require("../question/question.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository, questionRepository) {
        this.userRepository = userRepository;
        this.questionRepository = questionRepository;
    }
    async findOne(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    async findUserQuestions(id) {
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
    async createUser(user) {
        user.password = (0, bcrypt_1.hashSync)(user.password, 10);
        return this.userRepository.save(this.userRepository.create(user));
    }
    async addQuestion(newQuestionDto, id) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        user.questions.push(newQuestionDto);
        await this.userRepository.save(user);
    }
    async removeQuestion(questionId, id) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        user.questions = user.questions.filter((item) => item.id !== questionId);
        await this.userRepository.save(user);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map