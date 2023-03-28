import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  UseInterceptors,
  UploadedFiles,
  Optional,
  Put,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IPlace, PlaceService } from './place.service';

@ApiTags('Place')
@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  //criar lugar
  @Post()
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: './tmp/place',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          const ext = extname(file.originalname);

          const filename = `${ext}-${uniqueSuffix}-${ext}`;

          callback(null, filename);
        },
      }),
    }),
  )
  create(
    @Body() createPlace: IPlace,
    @Optional()
    @UploadedFiles()
    files?: Array<Express.Multer.File>,
  ) {
    createPlace.name = createPlace.name.toLowerCase();
    files ? (createPlace.files = files) : null;
    return this.placeService.create(createPlace);
  }

  //atualizar lugar por ID
  @Put('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updatePlace: Prisma.PlaceUpdateInput,
  ) {
    try {
      const placeId = parseInt(id, 10);
      if (updatePlace.name)
        updatePlace.name = String(updatePlace.name).toLowerCase();
      if (updatePlace.description)
        updatePlace.description = String(updatePlace.description).toLowerCase();
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

  //buscar todos os lugares
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

  //Buscar lugar por ID
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

  //Deletar um lugar pelo ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const placeId = parseInt(id, 10);
      const place = await this.placeService.delete(placeId);
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
