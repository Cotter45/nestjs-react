import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'build'),
      exclude: ['/api/**'],
    }),
    PrismaModule,
    UsersModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
