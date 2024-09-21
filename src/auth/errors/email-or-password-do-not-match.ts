import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailOrPasswordDoNotMatch extends HttpException {
  constructor() {
    super('Email ou senha inválidas.', HttpStatus.BAD_REQUEST);
  }
}
