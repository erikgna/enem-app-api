import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./user.entity";
import { Question } from "src/question/question.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Question]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [UserService, TypeOrmModule.forFeature([Users])],
})
export class UserModule {}
