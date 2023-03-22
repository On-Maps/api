import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class UserToken {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  token: string;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: Date })
  expiresDate: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
