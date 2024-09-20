import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable() // para injeção de dependencia.
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async users() {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  // Prisma gera tipagens especificas baseadas nos models criados.
  // Essa, por exemplo, permite que um usuario especifico seja encontrado
  // com base em seus campos unicos definidos no model. (como id e email)
  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const user = await this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });

    return user;
  }

  // Prisma.MOdelCrateInput
  // Semelhante á uma DTO, que seria os campos definidos, cada um com validação.
  // Prisma gera automaticamente essa tipagem com base nos models.
  async createUser(data: Prisma.UserCreateInput) {
    return await this.prismaService.user.create({
      data,
    });
  }

  // aqui há uma combinaçao das duas tipagens do prisma.
  //  userUpdateInput pra definir todos os dados que podem ser atualizados;
  //  userWhereUniqueInput para, novamente, identificar um registro unico de usuario.
  async updateUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    return await this.prismaService.user.update({
      data,
      where: userWhereUniqueInput,
    });
  }

  async deleteUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    await this.prismaService.user.delete({
      where: userWhereUniqueInput,
    });

    return {
      message: 'null',
    };
  }
}
