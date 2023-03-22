import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

@Module({
  controllers: [PlaceController],
  providers: [PlaceService, PrismaService],
})
export class PlaceModule {}
