import { University } from './university';
import { Place } from './place';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Campus {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  city: string;

  @ApiProperty({ type: String })
  state: string;

  @ApiPropertyOptional({ type: String })
  phone?: string;

  @ApiPropertyOptional({ type: String })
  email?: string;

  @ApiProperty({ type: () => University })
  university: University;

  @ApiProperty({ type: Number })
  universityId: number;

  @ApiProperty({ isArray: true, type: () => Place })
  place: Place[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
