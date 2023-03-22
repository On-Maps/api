import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PlaceService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PlaceCreateInput) {
    const place = await this.prisma.place.create({
      data,
    });

    return place;
  }

  async findAll() {
    const places = await this.prisma.place.findMany();

    return places;
  }

  async update(id: number, data: Prisma.PlaceUpdateInput) {
    const place = await this.prisma.place.update({
      where: { id },
      data,
    });

    return place;
  }

  async findOne(id: number) {
    const place = await this.prisma.place.findUnique({
      where: { id },
    });

    return place;
  }

  async remove(id: number) {
    const place = await this.prisma.place.delete({
      where: { id },
    });

    return place;
  }
}
