import { Module } from "@nestjs/common";
import { QuestionsController } from "./question.controller";
import { QuestionsService } from "./question.service";
import { Question } from "./entity/question.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "src/user/user.service";
import { Users } from "src/user/entity/user.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, UserService, JwtService],
})
export class QuestionsModule {}
