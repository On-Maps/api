import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async create(createEvent: Prisma.EventCreateInput) {
    try {
      createEvent.name = createEvent.name.toLowerCase();
      createEvent.description = createEvent.description.toLowerCase();

      if (
        createEvent.name === null ||
        createEvent.name === undefined ||
        createEvent.name === ''
      ) {
        throw new HttpException(
          `The event name is required.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const event = await this.prisma.event.create({
        data: createEvent,
        include: {
          place: true,
        },
      });
      return event;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while registering event',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAll() {
    try {
      const events = await this.prisma.event.findMany({
        include: {
          place: true,
        },
      });
      if (events.length === 0)
        throw new HttpException('No event found.', HttpStatus.NOT_FOUND);
      return events;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while fetching the events.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string) {
    try {
      const eventId = parseInt(id, 10);
      const event = await this.prisma.event.findUnique({
        where: {
          id: eventId,
        },
        include: {
          place: true,
        },
      });
      if (!event)
        throw new HttpException(
          `Event with ID ${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      return event;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while fetching the event.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateEvent: Prisma.EventUpdateInput) {
    try {
      updateEvent.name = String(updateEvent.name).toLowerCase();
      if (updateEvent.description)
        updateEvent.description = String(updateEvent.description).toLowerCase();

      if (
        updateEvent.name === null ||
        updateEvent.name === undefined ||
        updateEvent.name === ''
      ) {
        throw new HttpException(
          `The event name is required.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const event = await this.prisma.event.update({
        where: {
          id: id,
        },
        data: updateEvent,
        include: {
          place: true,
        },
      });
      return event;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while updating the event.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number) {
    try {
      const event = await this.prisma.event.delete({
        where: {
          id: id,
        },
        include: {
          place: true,
        },
      });
      return event;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while deleting the event.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getEventsByPlaceName(placeName: string) {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          place: {
            name: {
              contains: placeName,
            },
          },
        },
        include: {
          place: true,
        },
      });
      if (events.length === 0)
        throw new HttpException('No event found.', HttpStatus.NOT_FOUND);
      return events;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while fetching the events.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getEventsByPlaceId(placeId: number) {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          placeId: placeId,
        },
        include: {
          place: true,
        },
      });
      if (events.length === 0)
        throw new HttpException('No event found.', HttpStatus.NOT_FOUND);
      return events;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'An error occurred while fetching the events.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
