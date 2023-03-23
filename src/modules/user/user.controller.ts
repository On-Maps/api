import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //criar usuário
  @Post()
  create(@Body() data: Prisma.UserCreateInput) {
    return this.userService.create(data);
  }

  //login
  @Post('login')
  login(@Body() data: { email: string; password: string }) {
    return this.userService.login(data.email, data.password);
  }
}
