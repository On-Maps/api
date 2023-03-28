import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UniversityService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UniversityCreateInput) {
    const university = await this.prisma.university.create({
      data,
      include: {
        campuses: true,
      },
    });

    return university;
  }

  async update(id: number, data: Prisma.UniversityUpdateInput) {
    const university = await this.prisma.university.update({
      where: { id },
      data,
    });

    return university;
  }

  async findAll() {
    const universities = await this.prisma.university.findMany({
      include: {
        campuses: true,
      },
    });
    return universities;
  }

  async delete(id: number) {
    const university = await this.prisma.university.delete({
      include: {
        campuses: true,
      },
      where: { id },
    });
    return university;
  }
}
