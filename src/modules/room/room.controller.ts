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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const roomId = parseInt(id, 10);
    const room = await this.roomService.findOne(roomId);
    return room;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const roomId = parseInt(id, 10);
      const room = await this.roomService.remove(roomId);
      return room;
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
