import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from './user-repository';
import { Prisma, User } from '@prisma/client';
import { MissingId } from 'src/errors/missing-id';
import { UserNotFound } from '../errors/user-not-found';

import bcrypt from 'bcrypt';
import { MissingFields } from '../errors/missing-fields';

@Injectable() // para torná-lo injetável, permitindo, assim, injeção de depeneencia
export class UserServiceRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async users(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    if (!users) throw new UserNotFound();

    return users;
  }

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!user) throw new UserNotFound();

    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const { name, email, password, cpfCnpj, cart, order, role } = data;
    if (!name || !email || !password || !cpfCnpj) throw new MissingFields();

    const hashPassword = await bcrypt.hash(password, 8);

    return await this.prisma.user.create({
      data: { name, email, password: hashPassword, cpfCnpj, cart, order, role },
    });
  }

  async updateUser(
    data: Prisma.UserUpdateInput,
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    if (!userWhereUniqueInput) throw new MissingId();

    return await this.prisma.user.update({
      data,
      where: userWhereUniqueInput,
    });
  }

  async deleteUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<{ message: string }> {
    if (!userWhereUniqueInput) throw new MissingId();

    await this.prisma.user.delete({
      where: userWhereUniqueInput,
    });

    return {
      message: 'null',
    };
  }
}
