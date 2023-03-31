import { Campus } from './campus';
import { Image } from './image';
import { Event } from './event';
import { Category } from './category';
import { Position } from './position';
import { Responsible } from './responsible';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Place {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: () => Campus })
  campus: Campus;

  @ApiProperty({ type: Number })
  campusId: number;

  @ApiProperty({ isArray: true, type: () => Image })
  image: Image[];

  @ApiPropertyOptional({ type: Number })
  floor?: number;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: Boolean })
  acessibility: boolean;

  @ApiPropertyOptional({ type: Number })
  capacity?: number;

  @ApiProperty({ isArray: true, type: () => Event })
  events: Event[];

  @ApiProperty({ type: Boolean })
  open24h: boolean;

  @ApiProperty({ type: Date })
  timestamp: Date;

  @ApiPropertyOptional({ type: String })
  building?: string;

  @ApiProperty({ isArray: true, type: () => Category })
  category: Category[];

  @ApiProperty({ isArray: true, type: () => Position })
  position: Position[];

  @ApiProperty({ type: String })
  equipment: string;

  @ApiProperty({ isArray: true, type: () => Responsible })
  responsible: Responsible[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
