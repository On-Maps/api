import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  //criar evento
  @Post()
  async createEvent(@Body() createEvent: Prisma.EventCreateInput) {
    return this.eventService.create(createEvent);
  }

  //buscar todos os eventos
  @Get()
  async getAllEvents() {
    return this.eventService.getAll();
  }

  //buscar evento por ID
  @Get(':id')
  async getEventById(@Param('id') id: string) {
    return this.eventService.getById(id);
  }

  //atualizar evento por ID
  @Put('/update/:id')
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEvent: Prisma.EventUpdateInput,
  ) {
    const EventId = parseInt(id, 10);
    return this.eventService.update(EventId, updateEvent);
  }

  //deletar evento por ID
  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    const EventId = parseInt(id, 10);
    return this.eventService.delete(EventId);
  }
}
