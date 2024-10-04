import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderNotFound extends HttpException {
  constructor() {
    super('Pedido(s) não encontrado(s).', HttpStatus.NOT_FOUND);
  }
}
