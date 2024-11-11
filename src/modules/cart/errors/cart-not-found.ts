import { HttpException, HttpStatus } from '@nestjs/common';

export class CartNotFound extends HttpException {
  constructor() {
    super('Carrinho inexistente / não encontrado.', HttpStatus.NOT_FOUND);
  }
}
