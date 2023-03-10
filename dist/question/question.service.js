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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entity/user.entity");
const typeorm_2 = require("typeorm");
const question_entity_1 = require("./entity/question.entity");
var QueryStrings;
(function (QueryStrings) {
    QueryStrings["Random"] = "Random()";
    QueryStrings["Table"] = "question";
})(QueryStrings || (QueryStrings = {}));
const areas = ["naturais", "matematica", "humanas", "linguagens"];
const years = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2022];
let QuestionsService = class QuestionsService {
    constructor(questionsRepository, usersRepository) {
        this.questionsRepository = questionsRepository;
        this.usersRepository = usersRepository;
    }
    async findOne(url) {
        return this.questionsRepository.findOne({ where: { url } });
    }
    async findByFilter(filter, id) {
        const randomArea = filter.areas.length === 0
            ? areas[Math.floor(Math.random() * areas.length)]
            : filter.areas[Math.floor(Math.random() * filter.areas.length)];
        const randomYear = filter.years.length === 0
            ? years[Math.floor(Math.random() * years.length)]
            : filter.years[Math.floor(Math.random() * filter.years.length)];
        let question = await this.questionsRepository.query(`SELECT * FROM question WHERE url LIKE '%${randomArea}%' AND name LIKE '%${randomYear}%' ORDER BY RAND() LIMIT 1`);
        if (!id) {
            return question;
        }
        const user = await this.usersRepository.findOne({
            where: { id },
            select: { questions: true },
        });
        while (user.questions.findIndex((item) => item.id === question.id) !== -1) {
            question = await this.questionsRepository
                .createQueryBuilder(QueryStrings.Table)
                .select()
                .where({ url: (0, typeorm_2.Like)(`%${randomArea}%`), name: (0, typeorm_2.Like)(`%${randomYear}%`) })
                .orderBy(QueryStrings.Random)
                .getOne();
        }
        return question;
    }
};
QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(question_entity_1.Question)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], QuestionsService);
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=question.service.js.map