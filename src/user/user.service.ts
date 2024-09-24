import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UserNotFound } from './errors/user-not-found';

import * as bcrypt from 'bcrypt';
import { MissingId } from 'src/errors/missing-id';

@Injectable() // para injeção de dependencia.
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async users() {
    const users = await this.prisma.user.findMany();
    if (!users) throw new UserNotFound();

    return users;
  }

  // Prisma gera tipagens especificas baseadas nos models criados.
  // Essa, por exemplo, permite que um usuario especifico seja encontrado
  // com base em seus campos unicos definidos no model. (como id e email)
  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!user) throw new UserNotFound();

    return user;
  }

  // Prisma.MOdelCrateInput
  // Semelhante á uma DTO, que seria os campos definidos, cada um com validação.
  // Prisma gera automaticamente essa tipagem com base nos models.
  async createUser(data: Prisma.UserCreateInput) {
    const { name, email, password, cart, order, role } = data;
    const hashPassword = await bcrypt.hash(password, 8);

    return await this.prisma.user.create({
      data: { name, email, password: hashPassword, cart, order, role },
    });
  }

  // aqui há uma combinaçao das duas tipagens do prisma.
  //  userUpdateInput pra definir todos os dados que podem ser atualizados;
  //  userWhereUniqueInput para, novamente, identificar um registro unico de usuario.
  async updateUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    if (!userWhereUniqueInput) throw new MissingId();

    return await this.prisma.user.update({
      data,
      where: userWhereUniqueInput,
    });
  }

  async deleteUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    if (!userWhereUniqueInput) throw new MissingId();

    await this.prisma.user.delete({
      where: userWhereUniqueInput,
    });

    return {
      message: 'null',
    };
  }
}
