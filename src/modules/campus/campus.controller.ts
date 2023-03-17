import { Controller, Post, Body } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CampusService } from './campus.service';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Post()
  create(@Body() createCampus: Prisma.CampusCreateInput) {
    return this.campusService.create(createCampus);
  }
}
