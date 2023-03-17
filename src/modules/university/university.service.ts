import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UniversityService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UniversityCreateInput) {
    const university = await this.prisma.university.create({
      data,
    });

    return university;
  }
}
