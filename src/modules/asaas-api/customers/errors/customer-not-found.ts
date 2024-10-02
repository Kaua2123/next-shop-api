import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomerNotFound extends HttpException {
  constructor() {
    super('Customer(s) not found', HttpStatus.NOT_FOUND);
  }
}
