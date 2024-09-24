import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingId extends HttpException {
  constructor() {
    super('Id não fornecido.', HttpStatus.BAD_REQUEST);
  }
}
