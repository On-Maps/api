import { Place } from './place';
import { ApiProperty } from '@nestjs/swagger';

export class Responsible {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  phone: string;

  @ApiProperty({ type: () => Place })
  place: Place;

  @ApiProperty({ type: Number })
  placeId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
