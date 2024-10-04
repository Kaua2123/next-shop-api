import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentNotFound extends HttpException {
  constructor() {
    super('Cobrança(s) não encontrada(s).', HttpStatus.NOT_FOUND);
  }
}
