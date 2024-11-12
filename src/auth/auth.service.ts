import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { EmailOrPasswordDoNotMatch } from './errors/email-or-password-do-not-match';
import { UserNotFound } from 'src/modules/user/errors/user-not-found';

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

    if (!user) throw new UserNotFound();

    const pass = await bcrypt.compare(
      userWhereUniqueInput.password.toString(),
      user.password,
    );

    if (!pass) throw new EmailOrPasswordDoNotMatch();

    const { id, role } = user;

    const token = jwt.sign({ id, role }, process.env.SECRET);

    if (user.role === 'ADMIN') return { token, role: 'ADM' };

    return { token, role: 'CLIENT' };
  }
}
