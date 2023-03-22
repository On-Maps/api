import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async findAll() {
    try {
      const universities = await this.prisma.university.findMany({
        include: {
          campuses: true,
        },
      });
      if (universities.length === 0) {
        throw new NotFoundException('Nenhuma universidade encontrada.');
      }
      return universities;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro ao buscar as universidades.',
      );
    }
  }

  async update(id: number, data: Prisma.UniversityUpdateInput) {
    const university = await this.prisma.university.update({
      where: { id },
      data,
    });

    return university;
  }
}
