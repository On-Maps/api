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
    });

    return university;
  }

  async findAll() {
    try {
      const universities = await this.prisma.university.findMany();
      if (universities.length === 0) {
        throw new NotFoundException('Nenhuma universidade encontrada.');
      }
      return universities;
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao buscar as universidades.',
      );
    }
  }
}
