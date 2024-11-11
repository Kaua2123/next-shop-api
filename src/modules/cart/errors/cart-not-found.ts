import { HttpException, HttpStatus } from '@nestjs/common';

export class CartNotFound extends HttpException {
  constructor() {
    super('Cart not created or not found.', HttpStatus.NOT_FOUND);
  }
}
