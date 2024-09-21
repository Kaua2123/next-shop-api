import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { EmailOrPasswordDoNotMatch } from './errors/email-or-password-do-not-match';
import { UserNotFound } from 'src/user/errors/user-not-found';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(userWhereUniqueInput: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: userWhereUniqueInput.email,
      },
    });

    if (!user) throw new UserNotFound();

    const pass = await bcrypt.compare(
      userWhereUniqueInput.password.toString(),
      user.password,
    );

    if (!pass) throw new EmailOrPasswordDoNotMatch();

    const { id } = user;

    const token = jwt.sign({ id }, process.env.SECRET);
    return { token };
  }
}
