import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Put,
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
      throw new InternalServerErrorException(
        'An error occurred while registering user',
      );
    }
  }

  //update user
  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    try {
      const user = await this.userService.findAll();
      const userEmail = data.email;
      const userId = Number(id);

      if (data.email) {
        if (!validateEmail(String(userEmail))) {
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
      }
      return this.userService.update(userId, data);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
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
