import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingFields extends HttpException {
  constructor() {
    super('Missing fields. ', HttpStatus.BAD_REQUEST);
  }
}
