import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { QuestionsModule } from "./question/question.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ReportModule } from "./report/report.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "enem_db",
      port: 3306,
      username: "root",
      password: "Erik2202*",
      database: "enem",
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
