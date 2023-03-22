import { Place } from './place';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Evento {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiPropertyOptional({ type: Date })
  date?: Date;

  @ApiProperty({ type: () => Place })
  place: Place;

  @ApiProperty({ type: Number })
  placeId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
