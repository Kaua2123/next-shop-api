import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart-dto';
import { AddItemsToCartDto } from './dto/add-items-to-cart-dto';
import { UpdateItemQuantityDto } from './dto/update-item-quantity-dto';

@Controller('/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('/')
  async getCarts() {
    return await this.cartService.carts();
  }

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

  @Delete('/removeItemFromCart/:id/:productId')
  async removeItemFromCart(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return await this.cartService.removeItemFromCart(id, productId);
  }

  @Patch('/updateQuantity/:id/:productId')
  async updateItemQuantity(
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Body() updateItemQuantityDto: UpdateItemQuantityDto,
  ) {
    return await this.cartService.updateItemQuantity(
      { id },
      productId,
      updateItemQuantityDto,
    );
  }

  @Delete('/delete/:id')
  async deleteCart(@Param('id') id: string) {
    return await this.cartService.deleteCart({ id });
  }
}
