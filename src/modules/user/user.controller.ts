import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // devido ao fato de userService ser Injectable, pode-se usar ele aqui, no construtor da classe. como uma dependênica.

  @Get('/')
  async getUsers() {
    return this.userService.users();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return this.userService.user({ id: Number(id) }); // convertendo para number, pois será recebido sttring
  }

  @Post('/create')
  async createUser(
    @Body() // pegar os dados do corpo da requisiçao
    userData: {
      name: string;
      email: string;
      password: string;
      cpfCnpj: string;
      role?: 'CLIENT' | 'ADMIN';
    },
  ) {
    return this.userService.createUser(userData);
  }

  @Put('/update/:id')
  async updateUser(
    @Param('id') id: number,
    @Body()
    userData: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    return this.userService.updateUser({ id: Number(id) }, userData);
  }

  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser({ id: Number(id) }); // conversão pra number, pois virá como string
  }
}
