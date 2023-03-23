import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Campus } from 'src/_gen/prisma-class/campus';
import { CampusService } from './campus.service';

@ApiTags('Campus')
@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @ApiResponse({
    schema: {
      example: {
        name: 'Campus 1',
        city: 'São Paulo',
        state: 'SP',
        phone: '11999999999',
        email: 'usp@gmail.com',
        university: {
          connect: {
            id: 1,
          },
        },
      },
    },
  })

  //criar campus
  @Post()
  async create(@Body() createCampus: Prisma.CampusCreateInput) {
    createCampus.name = createCampus.name.toLowerCase();
    createCampus.city = createCampus.city.toLowerCase();
    createCampus.state = createCampus.state.toLowerCase();

    const campus = await this.campusService.findAll();
    campus.forEach((campus) => {
      if (campus.name === createCampus.name) {
        throw new HttpException(
          `The campus named '${createCampus.name}' already exists.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
    return this.campusService.create(createCampus);
  }

  //atualizar campus por ID
  @Post('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCampus: Prisma.CampusUpdateInput,
  ) {
    try {
      const placeId = parseInt(id, 10);
      updateCampus.name = String(updateCampus.name).toLowerCase();
      updateCampus.city = String(updateCampus.city).toLowerCase();
      updateCampus.state = String(updateCampus.state).toLowerCase();
      const updatedCampus = await this.campusService.update(
        placeId,
        updateCampus,
      );
      if (!updatedCampus) {
        throw new NotFoundException(`Campus with ID ${id} not found.`);
      }
      return updatedCampus;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Campus with ID ${id} not found.`);
        }
      }
      throw new InternalServerErrorException(
        'An error occurred while updating the campus.',
      );
    }
  }

  @ApiParam({
    name: 'id',
    description: 'ID do campus',
  })
  @ApiResponse({
    type: Campus,
  })

  //buscar todos os campus
  @Get()
  async findAll() {
    try {
      const campus = await this.campusService.findAll();
      if (campus.length === 0) {
        throw new NotFoundException('No campus found.');
      }
      return campus;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while fetching the campus.',
      );
    }
  }
}
