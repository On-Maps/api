import { Module } from '@nestjs/common';
import { AppController } from './modules/app/app.controller';
import { AppService } from './modules/app/app.service';
import { PrismaService } from './database/prisma.service';
import { UniversityModule } from './modules/university/university.module';
import { CampusModule } from './modules/campus/campus.module';
import { UserModule } from './modules/user/user.module';
import { PlaceModule } from './modules/place/place.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    UniversityModule,
    CampusModule,
    PlaceModule,
    UserModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
