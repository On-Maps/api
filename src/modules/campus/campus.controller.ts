import { Controller, Post, Body, Param } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CampusService } from './campus.service';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Post()
  create(@Body() createCampus: Prisma.CampusCreateInput) {
    return this.campusService.create(createCampus);
  }

  @Post('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCampus: Prisma.CampusUpdateInput,
  ) {
    const roomId = parseInt(id, 10);
    const updatedCampus = await this.campusService.update(roomId, updateCampus);
    return updatedCampus;
  }
}
