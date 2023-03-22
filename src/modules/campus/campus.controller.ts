import { Controller, Post, Body, Param, Get } from '@nestjs/common';
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
  @Post()
  create(@Body() createCampus: Prisma.CampusCreateInput) {
    createCampus.name = createCampus.name.toLowerCase();
    createCampus.city = createCampus.city.toLowerCase();
    createCampus.state = createCampus.state.toLowerCase();
    return this.campusService.create(createCampus);
  }

  @Post('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCampus: Prisma.CampusUpdateInput,
  ) {
    const placeId = parseInt(id, 10);
    updateCampus.name = String(updateCampus.name).toLowerCase();
    updateCampus.city = String(updateCampus.city).toLowerCase();
    updateCampus.state = String(updateCampus.state).toLowerCase();
    const updatedCampus = await this.campusService.update(
      placeId,
      updateCampus,
    );
    return updatedCampus;
  }

  @ApiParam({
    name: 'id',
    description: 'ID do campus',
  })
  @ApiResponse({
    type: Campus,
  })
  @Get()
  findAll() {
    return this.campusService.findAll();
  }
}
