import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { UniversityService } from './university.service';

@ApiTags('University')
@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post()
  async create(@Body() createUniversity: Prisma.UniversityCreateInput) {
    createUniversity.name = createUniversity.name.toLowerCase();
    createUniversity.acronym = createUniversity.acronym.toUpperCase();

    const university = await this.universityService.findAll();
    university.forEach((university) => {
      if (university.name === createUniversity.name) {
        throw new HttpException(
          `A universidade de nome '${createUniversity.name}' já existe.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    return this.universityService.create(createUniversity);
  }

  @Get()
  findAll() {
    return this.universityService.findAll();
  }

  @Post('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUniversity: Prisma.UniversityUpdateInput,
  ) {
    try {
      const UniversityId = parseInt(id, 10);
      updateUniversity.name = String(updateUniversity.name).toLowerCase();
      updateUniversity.acronym = String(updateUniversity.acronym).toUpperCase();
      const updatedUniversity = await this.universityService.update(
        UniversityId,
        updateUniversity,
      );
      return updatedUniversity;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Universidade com o ID ${id} não encontrada.`,
          );
        }
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro ao atualizar a universidade.',
      );
    }
  }
}
