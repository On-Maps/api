import { Place } from './place';
import { ApiProperty } from '@nestjs/swagger';

export class Image {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  url: string;

  @ApiProperty({ type: () => Place })
  place: Place;

  @ApiProperty({ type: Number })
  placeId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
