import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { QuestionsModule } from "./question/question.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ReportModule } from "./report/report.module";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "erikna.com",
      port: 3306,
      username: "eriknaco_1",
      password: "Erik2202***",
      database: "eriknaco_unsolved",
      entities: [__dirname + "/**/*.entity{.js,.ts}"],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    QuestionsModule,
    UserModule,
    ReportModule,
    AuthModule,
  ],
})
export class AppModule {}
