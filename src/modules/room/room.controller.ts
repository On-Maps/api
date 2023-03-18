import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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

  @Post('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateRoom: Prisma.RoomUpdateInput,
  ) {
    const roomId = parseInt(id, 10);
    const updatedRoom = await this.roomService.update(roomId, updateRoom);
    return updatedRoom;
  }
}
