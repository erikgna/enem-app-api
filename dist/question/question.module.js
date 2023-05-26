"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const question_controller_1 = require("./question.controller");
const question_service_1 = require("./question.service");
const question_entity_1 = require("./entity/question.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entity/user.entity");
const jwt_1 = require("@nestjs/jwt");
let QuestionsModule = class QuestionsModule {
};
QuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([question_entity_1.Question]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users]),
        ],
        controllers: [question_controller_1.QuestionsController],
        providers: [question_service_1.QuestionsService, user_service_1.UserService, jwt_1.JwtService],
    })
], QuestionsModule);
exports.QuestionsModule = QuestionsModule;
//# sourceMappingURL=question.module.js.map