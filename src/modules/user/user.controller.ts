import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

function validateEmail(email: string) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //criar usuário
  @Post()
  async create(
    @Body()
    data: Prisma.UserCreateInput,
  ) {
    try {
      const user = await this.userService.findAll();
      const userEmail = data.email;

      if (!validateEmail(userEmail)) {
        throw new HttpException(
          `The email '${userEmail}' is not in a valid format.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      user.forEach((user) => {
        if (user.email === data.email) {
          throw new HttpException(
            `The email '${data.email}' already exists.`,
            HttpStatus.BAD_REQUEST,
          );
        }
      });
      return this.userService.create(data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred while registering user',
      );
    }
  }

  //login
  @Post('login')
  login(@Body() data: { email: string; password: string }) {
    return this.userService.login(data.email, data.password);
  }
}
