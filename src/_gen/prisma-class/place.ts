import { Campus } from './campus';
import { Evento } from './evento';
import { Category } from './category';
import { Position } from './position';
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

  @ApiPropertyOptional({ type: Number })
  piso?: number;

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ isArray: true, type: () => Evento })
  eventos: Evento[];

  @ApiProperty({ type: Boolean })
  open: boolean;

  @ApiProperty({ type: Date })
  timestamp: Date;

  @ApiProperty({ isArray: true, type: () => Category })
  category: Category[];

  @ApiProperty({ isArray: true, type: () => Position })
  position: Position[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
