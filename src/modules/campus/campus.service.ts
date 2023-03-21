import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async update(id: number, data: Prisma.CampusUpdateInput) {
    const campus = await this.prisma.campus.update({
      where: { id },
      data,
    });

    return campus;
  }

  async findAll() {
    try {
      const campus = await this.prisma.campus.findMany();
      if (campus.length === 0) {
        throw new NotFoundException('Nenhum campus encontrado.');
      }
      return campus;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro ao buscar os campus.',
      );
    }
  }
}
