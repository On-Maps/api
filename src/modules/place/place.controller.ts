import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { PlaceService } from './place.service';

@ApiTags('Place')
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  create(@Body() createPlace: Prisma.PlaceCreateInput) {
    createPlace.name = createPlace.name.toLowerCase();
    return this.placeService.create(createPlace);
  }

  @Get()
  findAll() {
    return this.placeService.findAll();
  }

  @Post('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updatePlace: Prisma.PlaceUpdateInput,
  ) {
    const placeId = parseInt(id, 10);
    updatePlace.name = String(updatePlace.name).toLowerCase();
    const updatedPlace = await this.placeService.update(placeId, updatePlace);
    return updatedPlace;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const placeId = parseInt(id, 10);
    const place = await this.placeService.findOne(placeId);
    return place;
  }

  //Busca todas as salas pelo ID do campus
  @Get('/campus/:id')
  async findAllByCampus(@Param('id') id: string) {
    const campusId = parseInt(id, 10);
    const places = await this.placeService.findAllByCampus(campusId);
    return places;
  }

  //Busca todas as salas pelo nome do campus
  @Get('/campus-name/:name')
  async findAllByNameCampus(@Param('name') name: string) {
    const places = await this.placeService.findAllByNameCampus(name);
    return places;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const placeId = parseInt(id, 10);
      const place = await this.placeService.remove(placeId);
      return place;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Sala com o ID ${id} não encontrada.`);
        }
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro ao excluir a sala.',
      );
    }
  }
}
