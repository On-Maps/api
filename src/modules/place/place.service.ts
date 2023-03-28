import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

export interface IPlace {
  name: string;
  piso?: string | null;
  description?: string | null;
  open: boolean;
  timestamp: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  campus: string;
  category?: string;
  position?: {
    latitude: string;
    longitude: string;
  }[];
  files?: Express.Multer.File[];
}

@Injectable()
export class PlaceService {
  constructor(private prisma: PrismaService) {}

  async create({
    name,
    piso,
    description,
    open,
    timestamp,
    createdAt,
    updatedAt,
    campus,
    category,
    position,
    files,
  }: IPlace) {
    const place = await this.prisma.place.create({
      data: {
        name,
        piso: Number(piso),
        description,
        open: open == true ? true : false,
        timestamp,
        createdAt: createdAt || new Date(),
        updatedAt: updatedAt || new Date(),
        campus: {
          connect: { id: Number(campus) },
        },
        position: {
          create: position.map((pos) => ({
            latitude: Number(pos.latitude),
            longitude: Number(pos.longitude),
          })),
        },
        image: {
          create: files.map((file) => ({
            url: file.path,
          })),
        },
      },
      include: {
        // category: true,
        image: true,
        campus: true,
        position: true,
      },
    });

    return place;
  }

  async findAll() {
    const places = await this.prisma.place.findMany({
      include: {
        campus: true,
        eventos: true,
        position: true,
        category: true,
      },
    });

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
      include: {
        campus: true,
        eventos: true,
        position: true,
        category: true,
      },
    });

    return place;
  }

  async findByNameAndCampus(nameCampus: string, namePlace: string) {
    const places = await this.prisma.place.findMany({
      where: {
        campus: {
          name: {
            contains: nameCampus,
          },
        },
        AND: {
          name: {
            contains: namePlace,
          },
        },
      },
      include: {
        campus: true,
        eventos: true,
        position: true,
        category: true,
      },
    });

    return places;
  }

  async remove(id: number) {
    const place = await this.prisma.place.delete({
      where: { id },
    });

    return place;
  }

  async findAllByCampus(id: number) {
    const places = await this.prisma.place.findMany({
      where: { campusId: id },
      include: {
        campus: true,
        eventos: true,
        position: true,
        category: true,
      },
    });

    return places;
  }

  async findAllByNameCampus(name: string) {
    const places = await this.prisma.place.findMany({
      where: {
        campus: {
          name: {
            contains: name,
          },
        },
      },
      include: {
        campus: true,
        eventos: true,
        position: true,
        category: true,
      },
    });

    return places;
  }
}
