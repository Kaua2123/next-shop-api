import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(userWhereUniqueInput: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: userWhereUniqueInput.email,
      },
    });

    if (!user)
      return {
        message: 'Usuário não encontrado.',
      };

    const pass = bcrypt.compare(
      String(userWhereUniqueInput.password),
      user.password,
    );

    if (!pass)
      return {
        message: 'Email ou senha incorretas.',
      };

    const { id } = user;

    const token = jwt.sign({ id }, process.env.SECRET);
    return { token };
  }
}
