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
  async findAll() {
    try {
      const place = await this.placeService.findAll();
      if (place.length === 0) {
        throw new NotFoundException('No place found.');
      }
      return place;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while fetching the places.',
      );
    }
  }

  @Post('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updatePlace: Prisma.PlaceUpdateInput,
  ) {
    try {
      const placeId = parseInt(id, 10);
      updatePlace.name = String(updatePlace.name).toLowerCase();
      const updatedPlace = await this.placeService.update(placeId, updatePlace);
      return updatedPlace;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Place with ID ${id} not found.`);
        }
      }
      throw new InternalServerErrorException(
        'An error occurred while updating the place.',
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const placeId = parseInt(id, 10);
      const place = await this.placeService.findOne(placeId);
      if (!place) {
        throw new NotFoundException(`Place with ID ${id} not found.`);
      }
      return place;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while fetching the place.',
      );
    }
  }

  //Busca todas o lugar pelo nome e pelo campus
  @Get('/campus/:campusName/name/:name')
  async findByNameAndCampus(
    @Param('campusName') campusName: string,
    @Param('name') name: string,
  ) {
    const place = await this.placeService.findByNameAndCampus(campusName, name);

    return place;
  }

  //Busca todas os lugares pelo ID do campus
  @Get('/campus/:id')
  async findAllByCampus(@Param('id') id: string) {
    const campusId = parseInt(id, 10);
    const places = await this.placeService.findAllByCampus(campusId);
    return places;
  }

  //Busca todas os lugares pelo nome do campus
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
      if (!place) {
        throw new NotFoundException(`Place with ID ${id} not found.`);
      }
      return place;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'There was an error deleting the place.',
      );
    }
  }
}
