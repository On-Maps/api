import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CampusService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CampusCreateInput) {
    const campus = await this.prisma.campus.create({
      data,
    });

    return campus;
  }
}