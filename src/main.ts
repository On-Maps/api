import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Campus } from './_gen/prisma-class/campus';
import { Category } from './_gen/prisma-class/category';
import { University } from './_gen/prisma-class/university';
import { User } from './_gen/prisma-class/user';
import { UserToken } from './_gen/prisma-class/user_token';
import { Evento } from './_gen/prisma-class/evento';
import { Place } from './_gen/prisma-class/place';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const prismaService = app.get(PrismaService);

  const config = new DocumentBuilder()
    .setTitle('OnMaps example')
    .setDescription('The onmaps API description')
    .setVersion('2.x')
    .addTag('Maps')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [Campus, Category, Place, University, User, UserToken, Evento],
  });
  SwaggerModule.setup('api', app, document);

  await prismaService.enableShutdownHooks(app);

  console.log('🚀 Listening on port 3333');
  await app.listen(3333);
  console.log('🚀 Listening on port 3333');
}
bootstrap();
