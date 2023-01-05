import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/user/user.entity";
import { Like, Repository } from "typeorm";
import { IFilter } from "./question.controller";
import { Question } from "./question.entity";

enum QueryStrings {
  Random = "Random()",
  Table = "question",
}

const areas = ["naturais", "matematica", "humanas", "linguagens"];
const years = [
  2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2022,
];

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
  ) {}

  async findOne(url: string): Promise<Question> {
    return this.questionsRepository.findOne({ where: { url } });
  }

  async findByFilter(filter: IFilter, id: string): Promise<Question> {
    const randomArea =
      filter.areas.length === 0
        ? areas[Math.floor(Math.random() * areas.length)]
        : filter.areas[Math.floor(Math.random() * filter.areas.length)];

    const randomYear =
      filter.years.length === 0
        ? years[Math.floor(Math.random() * years.length)]
        : filter.years[Math.floor(Math.random() * filter.years.length)];

    let question = await this.questionsRepository
      .createQueryBuilder(QueryStrings.Table)
      .select()
      .where({ url: Like(`%${randomArea}%`), name: Like(`%${randomYear}%`) })
      .orderBy(QueryStrings.Random)
      .getOne();

    const user = await this.usersRepository.findOne({
      where: { id },
      select: { questions: true },
    });

    while (user.questions.findIndex((item) => item.id === question.id) !== -1) {
      question = await this.questionsRepository
        .createQueryBuilder(QueryStrings.Table)
        .select()
        .where({ url: Like(`%${randomArea}%`), name: Like(`%${randomYear}%`) })
        .orderBy(QueryStrings.Random)
        .getOne();
    }

    return question;
  }
}
