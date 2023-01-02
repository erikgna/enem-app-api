import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { QuestionsModule } from './question/question.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 55000,
      username: 'postgres',
      password: 'postgrespw',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    QuestionsModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
