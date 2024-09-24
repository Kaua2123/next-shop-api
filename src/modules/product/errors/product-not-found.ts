import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFound extends HttpException {
  constructor() {
    super('Produto(s) não encontrado(s).', HttpStatus.NOT_FOUND);
  }
}
