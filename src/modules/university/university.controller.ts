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
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { UniversityService } from './university.service';

@ApiTags('University')
@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  //criar universidade
  @Post()
  async create(@Body() createUniversity: Prisma.UniversityCreateInput) {
    try {
      createUniversity.name = createUniversity.name.toLowerCase();
      createUniversity.acronym = createUniversity.acronym.toUpperCase();

      const university = await this.universityService.findAll();
      university.forEach((university) => {
        if (university.name === createUniversity.name) {
          throw new HttpException(
            `The university named '${createUniversity.name}' already exists.`,
            HttpStatus.BAD_REQUEST,
          );
        }
      });

      return this.universityService.create(createUniversity);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while registering university',
      );
    }
  }

  //buscar todas as universidades
  @Get()
  async findAll() {
    try {
      const university = await this.universityService.findAll();
      if (university.length === 0) {
        throw new NotFoundException('No university found.');
      }
      return university;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while searching for universities.',
      );
    }
  }

  //atualizar universidade por ID
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
      if (!updatedUniversity) {
        throw new NotFoundException(`University with ID ${id} not found.`);
      }
      return updatedUniversity;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`University with ID ${id} not found.`);
        }
      }
      throw new InternalServerErrorException(
        'An error occurred while updating the university.',
      );
    }
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    try {
      const UniversityId = parseInt(id, 10);
      const deletedUniversity = await this.universityService.deleteUniversity(
        UniversityId,
      );
      return deletedUniversity;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`University with ID ${id} not found.`);
        }
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting the university.',
      );
    }
  }
}
