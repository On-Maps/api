import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

export interface IPlace {
  name: string;
  floor?: string | null;
  description?: string | null;
  acessibility: boolean;
  capacity?: number;
  open: boolean;
  timestamp: Date | string;
  building?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  campus: string;
  category?: string;
  position?: {
    latitude: string;
    longitude: string;
  }[];
  files?: Express.Multer.File[];
  equipment?: string;
  responsible?: {
    name: string;
    email: string;
    phone: string;
  }[];
}

@Injectable()
export class PlaceService {
  constructor(private prisma: PrismaService) {}

  async create({
    name,
    floor,
    description,
    acessibility,
    capacity,
    open,
    timestamp,
    building,
    equipment,
    createdAt,
    updatedAt,
    campus,
    category,
    position,
    files,
    responsible,
  }: IPlace) {
    const place = await this.prisma.place.create({
      data: {
        name,
        floor: Number(floor),
        description,
        acessibility,
        capacity: Number(capacity),
        open24h: open == true ? true : false,
        timestamp,
        building,
        equipment,
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
        responsible: {
          create: responsible.map((resp) => ({
            name: resp.name,
            email: resp.email,
            phone: resp.phone,
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

  async update(id: number, data: Prisma.PlaceUpdateInput) {
    const place = await this.prisma.place.update({
      where: { id },
      data,
    });

    return place;
  }

  async findAll() {
    const places = await this.prisma.place.findMany({
      include: {
        campus: true,
        events: true,
        position: true,
        category: true,
        image: true,
        responsible: true,
      },
    });

    return places;
  }

  async findOne(id: number) {
    const place = await this.prisma.place.findUnique({
      where: { id },
      include: {
        campus: true,
        events: true,
        position: true,
        category: true,
        image: true,
        responsible: true,
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
        events: true,
        position: true,
        category: true,
        image: true,
        responsible: true,
      },
    });

    return places;
  }

  async findAllByCampus(id: number) {
    const places = await this.prisma.place.findMany({
      where: { campusId: id },
      include: {
        campus: true,
        events: true,
        position: true,
        category: true,
        image: true,
        responsible: true,
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
        events: true,
        position: true,
        category: true,
        image: true,
        responsible: true,
      },
    });

    return places;
  }

  async delete(id: number) {
    const place = await this.prisma.place.delete({
      where: { id },
    });

    return place;
  }
}
