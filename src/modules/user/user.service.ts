import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserRepository } from './repositories/user-repository';

@Injectable() // para injeção de dependencia.
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async users() {
    return await this.userRepository.users();
  }

  // Prisma gera tipagens especificas baseadas nos models criados.
  // Essa, por exemplo, permite que um usuario especifico seja encontrado
  // com base em seus campos unicos definidos no model. (como id e email)
  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return await this.userRepository.user(userWhereUniqueInput);
  }

  // Prisma.MOdelCrateInput
  // Semelhante á uma DTO, que seria os campos definidos, cada um com validação.
  // Prisma gera automaticamente essa tipagem com base nos models.
  async createUser(data: Prisma.UserCreateInput) {
    return await this.userRepository.createUser(data);
  }

  //  aqui há uma combinaçao das duas tipagens do prisma.
  //  userUpdateInput pra definir todos os dados que podem ser atualizados;
  //  userWhereUniqueInput para, novamente, identificar um registro unico de usuario.
  async updateUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    return await this.userRepository.updateUser(data, userWhereUniqueInput);
  }

  async deleteUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return await this.userRepository.deleteUser(userWhereUniqueInput);
  }
}
