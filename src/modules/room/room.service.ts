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
}
