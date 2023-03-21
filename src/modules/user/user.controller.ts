import { Controller, Post, Body } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: Prisma.UserCreateInput) {
    return this.userService.create(data);
  }

  @Post('login')
  login(@Body() data: { email: string; password: string }) {
    return this.userService.login(data.email, data.password);
  }
}
