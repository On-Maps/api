import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CampusService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CampusCreateInput) {
    const campus = await this.prisma.campus.create({
      data,
      include: {
        university: true,
        place: true,
      },
    });

    return campus;
  }

  async update(id: number, data: Prisma.CampusUpdateInput) {
    const campus = await this.prisma.campus.update({
      where: { id },
      data,
    });

    return campus;
  }

  async findAll() {
    const campus = await this.prisma.campus.findMany({
      include: {
        university: true,
        place: true,
      },
    });
    return campus;
  }

  async deleteCampus(id: number) {
    const campus = await this.prisma.campus.delete({
      include: {
        place: true,
      },
      where: { id },
    });

    return campus;
  }
}
