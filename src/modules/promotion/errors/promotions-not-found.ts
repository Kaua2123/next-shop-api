import { HttpException, HttpStatus } from '@nestjs/common';

export class PromotionsNotFound extends HttpException {
  constructor() {
    super('Uma ou mais promoções não foram encontradas.', HttpStatus.NOT_FOUND);
  }
}
