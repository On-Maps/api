import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CampusService } from './campus.service';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

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
    const roomId = parseInt(id, 10);
    updateCampus.name = String(updateCampus.name).toLowerCase();
    updateCampus.city = String(updateCampus.city).toLowerCase();
    updateCampus.state = String(updateCampus.state).toLowerCase();
    const updatedCampus = await this.campusService.update(roomId, updateCampus);
    return updatedCampus;
  }

  @Get()
  findAll() {
    return this.campusService.findAll();
  }
}
