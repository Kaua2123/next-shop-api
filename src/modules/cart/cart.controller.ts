import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart-dto';
import { AddItemsToCartDto } from './dto/add-items-to-cart-dto';

@Controller('/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('/:id')
  async findCartById(@Param('id') id: string) {
    return await this.cartService.cart({ id });
  }

  @Post('/create')
  async createCartWithItems(@Body() createCartDto: CreateCartDto) {
    return await this.cartService.createCartWithItems(createCartDto);
  }

  @Put('/addItemsToCart/:id')
  async addItemsToCart(
    @Param('id') id: string,
    @Body() addItemsToCartDto: AddItemsToCartDto,
  ) {
    return await this.cartService.addItemsToCart({ id }, addItemsToCartDto);
  }
}
