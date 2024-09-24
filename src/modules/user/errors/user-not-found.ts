import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFound extends HttpException {
  constructor() {
    super('Usuário(s) não encontrado', HttpStatus.NOT_FOUND);
  }
}
