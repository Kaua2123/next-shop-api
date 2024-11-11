import { Controller, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('/:id')
  async findCartById(@Param('id') id: string) {
    return await this.cartService.cart({ id });
  }
}
