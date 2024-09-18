import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable() // para injeção de dependencia.
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async users() {
    const users = await this.prismaService.user.findMany();

    return users;
  }
}
