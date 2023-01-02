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
exports.QuestionsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const question_service_1 = require("./question.service");
let QuestionsController = class QuestionsController {
    constructor(questionsService, userService, jwtService) {
        this.questionsService = questionsService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async findAll() {
        return this.questionsService.findAll();
    }
    async findOne(id) {
        return this.questionsService.findOne(id);
    }
    async findFiltered(filterObjects, headers) {
        const authToken = headers.authorization;
        const question = await this.questionsService.findByFilter(filterObjects);
        if (!authToken)
            return question;
        console.log(this.jwtService.decode(authToken.split('')[1]));
        const id = this.jwtService.decode(authToken.split(' ')[1]).sub;
        await this.userService.addQuestion({
            id,
            newQuestion: question.id,
        });
        return question;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findFiltered", null);
QuestionsController = __decorate([
    (0, common_1.Controller)('questions'),
    __metadata("design:paramtypes", [question_service_1.QuestionsService,
        user_service_1.UserService,
        jwt_1.JwtService])
], QuestionsController);
exports.QuestionsController = QuestionsController;
//# sourceMappingURL=question.controller.js.map