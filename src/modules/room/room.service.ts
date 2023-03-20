import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RoomCreateInput) {
    const room = await this.prisma.room.create({
      data,
    });

    return room;
  }

  async findAll() {
    const rooms = await this.prisma.room.findMany();

    return rooms;
  }

  async update(id: number, data: Prisma.RoomUpdateInput) {
    const room = await this.prisma.room.update({
      where: { id },
      data,
    });

    return room;
  }

  async findOne(id: number) {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });

    return room;
  }
}
