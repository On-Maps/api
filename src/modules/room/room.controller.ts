import { Controller, Post, Body, Get } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoom: Prisma.RoomCreateInput) {
    return this.roomService.create(createRoom);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }
}
