import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { PrismaService } from './database/prisma.service';
import { UniversityModule } from './modules/university/university.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [UniversityModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
