import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';

@Module({
  controllers: [UniversityController],
  providers: [UniversityService, PrismaService],
})
export class UniversityModule {}
