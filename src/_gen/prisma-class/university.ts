import { Campus } from './campus';
import { ApiProperty } from '@nestjs/swagger';

export class University {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  acronym: string;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ isArray: true, type: () => Campus })
  campuses: Campus[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
