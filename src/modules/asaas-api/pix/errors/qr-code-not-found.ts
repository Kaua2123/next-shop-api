import { HttpException, HttpStatus } from '@nestjs/common';

export class QrCodeNotFound extends HttpException {
  constructor() {
    super('Qr code não encontrado.', HttpStatus.NOT_FOUND);
  }
}
