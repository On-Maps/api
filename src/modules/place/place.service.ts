import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

export interface IPlace {
  name: string;
  piso?: number | null;
  description?: string | null;
  open: boolean;
  timestamp: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  campus: number;
  eventos?: number;
  category?: number;
  latitude?: [number];
  longitude?: [number];
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
    eventos,
    category,
    latitude,
    longitude,
  }: IPlace) {
    const place = await this.prisma.place.create({
      data: {
        name,
        piso,
        description,
        open,
        timestamp,
        createdAt: createdAt || new Date(),
        updatedAt: updatedAt || new Date(),
        campus: {
          connect: { id: campus },
        },
        latitude: {
          create: latitude.map((lat) => ({ latitude: lat })),
        },
        longitude: {
          create: longitude.map((long) => ({ longitude: long })),
        },
      },
      include: {
        campus: true,
        latitude: true,
        longitude: true,
      },
    });

    return place;
  }

  async findAll() {
    const places = await this.prisma.place.findMany({
      include: {
        campus: true,
        eventos: true,
        latitude: true,
        longitude: true,
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
        latitude: true,
        longitude: true,
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
        latitude: true,
        longitude: true,
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
        latitude: true,
        longitude: true,
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
        latitude: true,
        longitude: true,
        category: true,
      },
    });

    return places;
  }
}
