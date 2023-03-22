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
