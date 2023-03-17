import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { PrismaService } from './database/prisma.service';
import { UniversityModule } from './university/university.module';

@Module({
  imports: [UniversityModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
