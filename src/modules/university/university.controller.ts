import { Controller, Post, Body } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UniversityService } from './university.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post()
  create(@Body() createUniversity: Prisma.UniversityCreateInput) {
    return this.universityService.create(createUniversity);
  }
}
