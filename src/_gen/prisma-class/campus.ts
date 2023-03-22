import { University } from './university';
import { Room } from './room';
import { ApiProperty } from '@nestjs/swagger';

export class Campus {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  city: string;

  @ApiProperty({ type: String })
  state: string;

  @ApiProperty({ type: String })
  phone: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: () => University })
  university: University;

  @ApiProperty({ type: Number })
  universityId: number;

  @ApiProperty({ isArray: true, type: () => Room })
  rooms: Room[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
