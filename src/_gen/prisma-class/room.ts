import { Campus } from './campus';
import { Evento } from './evento';
import { Category } from './category';
import { ApiProperty } from '@nestjs/swagger';

export class Room {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: () => Campus })
  campus: Campus;

  @ApiProperty({ type: Number })
  campusId: number;

  @ApiProperty({ type: Number })
  piso: number;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ isArray: true, type: () => Evento })
  eventos: Evento[];

  @ApiProperty({ type: Boolean })
  open: boolean;

  @ApiProperty({ type: Date })
  timestamp: Date;

  @ApiProperty({ isArray: true, type: () => Category })
  category: Category[];

  @ApiProperty({ type: Number })
  latitude: number;

  @ApiProperty({ type: Number })
  longitude: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
