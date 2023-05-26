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
const question_service_1 = require("./question.service");
let QuestionsController = class QuestionsController {
    constructor(questionsService, jwtService) {
        this.questionsService = questionsService;
        this.jwtService = jwtService;
    }
    async findOne(id) {
        try {
            return this.questionsService.findOne(id);
        }
        catch (error) {
            throw new common_1.HttpException("Ocorreu um erro desconhecido.", 500);
        }
    }
    async teste() {
        console.log("teste");
        return { teste: "teste" };
    }
    async findFiltered(filterObjects, headers) {
        var _a;
        let id = null;
        try {
            id = (_a = this.jwtService.decode(headers.authorization.split(" ")[1])) === null || _a === void 0 ? void 0 : _a.sub;
        }
        catch (_) {
            id = null;
        }
        try {
            const question = await this.questionsService.findByFilter(filterObjects, id);
            return question[0];
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw new common_1.HttpException(error.message, error.getStatus());
            }
            throw new common_1.HttpException("Ocorreu um erro desconhecido.", 500);
        }
    }
};
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("teste"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "teste", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionsController.prototype, "findFiltered", null);
QuestionsController = __decorate([
    (0, common_1.Controller)("questions"),
    __metadata("design:paramtypes", [question_service_1.QuestionsService,
        jwt_1.JwtService])
], QuestionsController);
exports.QuestionsController = QuestionsController;
//# sourceMappingURL=question.controller.js.map