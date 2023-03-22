import { Room } from './room';
import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: () => Room })
  room: Room;

  @ApiProperty({ type: Number })
  roomId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
