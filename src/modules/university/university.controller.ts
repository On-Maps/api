import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UniversityService } from './university.service';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post()
  create(@Body() createUniversity: Prisma.UniversityCreateInput) {
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
