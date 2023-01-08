import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { QuestionsModule } from "./question/question.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ReportModule } from "./report/report.module";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/public/",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
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
