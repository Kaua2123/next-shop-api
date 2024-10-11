import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/database/prisma.service';
import { userProviders } from './user.providers';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, ...userProviders],
})
export class UserModule {}
