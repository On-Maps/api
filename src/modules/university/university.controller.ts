import { Controller, Post, Body, Get } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UniversityService } from './university.service';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post()
  create(@Body() createUniversity: Prisma.UniversityCreateInput) {
    return this.universityService.create(createUniversity);
  }

  @Get()
  findAll() {
    return this.universityService.findAll();
  }
}
