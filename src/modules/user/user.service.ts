import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { hash, compare } from 'bcryptjs';
import auth from 'src/config/auth';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const password = await hash(data.password, 10);

    data.password = password;

    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async login(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error('Email or password incorrect');
      }

      const {
        expires_in_refresh_token,
        expires_in_token,
        secret_refresh_token,
        secret_token,
        expires_refresh_token_days,
      } = auth;

      const passwordHash = await compare(password, user.password);

      if (!passwordHash) {
        throw new Error('Email or password incorrect');
      }

      const token = sign({}, secret_token, {
        subject: user.name,
        expiresIn: expires_in_token,
      });

      await this.prisma.userToken.create({
        data: {
          token,
          expiresDate: new Date(Date.now() + 60 * 60 * 1000),
          userId: user.id,
        },
      });

      return token;
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }
}
