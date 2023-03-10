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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_auth_guard_1 = require("../auth/strategies/jwt-auth.guard");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async findOne(headers) {
        try {
            const id = this.jwtService.decode(headers.authorization.replace("Bearer ", "").replace(" ", ""))["sub"];
            return this.userService.findUserQuestions(id);
        }
        catch (error) {
            throw new common_1.HttpException("Ocorreu um erro desconhecido.", 500);
        }
    }
    async create(createUserDto) {
        try {
            const response = await this.userService.createUser(createUserDto);
            if (response.status > 300) {
                throw new common_1.HttpException(response.message, response.status);
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw new common_1.HttpException(error.message, error.getStatus());
            }
            throw new common_1.HttpException("Ocorreu um erro desconhecido.", 500);
        }
    }
    async newQuestion(newQuestionDto, headers) {
        var _a;
        try {
            const id = (_a = this.jwtService.decode(headers.authorization.replace("Bearer ", "").replace(" ", ""))) === null || _a === void 0 ? void 0 : _a.sub;
            const response = await this.userService.addQuestion(newQuestionDto, id);
            if (response.status > 300) {
                throw new common_1.HttpException(response.message, response.status);
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw new common_1.HttpException(error.message, error.getStatus());
            }
            throw new common_1.HttpException("Ocorreu um erro desconhecido.", 500);
        }
    }
    async eraseHistory(headers) {
        var _a;
        try {
            const id = (_a = this.jwtService.decode(headers.authorization.replace("Bearer ", "").replace(" ", ""))) === null || _a === void 0 ? void 0 : _a.sub;
            const response = await this.userService.eraseHistory(id);
            if (response.status > 300) {
                throw new common_1.HttpException(response.message, response.status);
            }
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
    (0, common_1.Get)("/questions"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)("/new-question"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "newQuestion", null);
__decorate([
    (0, common_1.Delete)("/erase-history"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "eraseHistory", null);
UserController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map