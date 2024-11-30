import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCartDto } from './dto/create-cart-dto';
import { AddItemsToCartDto } from './dto/add-items-to-cart-dto';
import { UpdateItemQuantityDto } from './dto/update-item-quantity-dto';
import { CartRepository } from './repositories/cart-repository';

@Injectable()
export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async carts() {
    return await this.cartRepository.carts();
  }

  async cart(cartWhereUniqueInput: Prisma.CartWhereUniqueInput) {
    return await this.cartRepository.cart(cartWhereUniqueInput);
  }

  async createCartWithItems(createCartDto: CreateCartDto) {
    return await this.cartRepository.createCartWithItems(createCartDto);
  }

  async addItemsToCart(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
    addItemsToCartDto: AddItemsToCartDto,
  ) {
    return await this.cartRepository.addItemsToCart(
      cartWhereUniqueInput,
      addItemsToCartDto,
    );
  }

  // remove o produto do carrinho, independente de sua quantidade.
  async removeItemFromCart(cartId: string, productIdToRemove: string) {
    return await this.cartRepository.removeItemFromCart(
      cartId,
      productIdToRemove,
    );
  }

  async updateItemQuantity(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
    productId: string,
    updateItemQuantityDto: UpdateItemQuantityDto,
  ) {
    return await this.cartRepository.updateItemQuantity(
      cartWhereUniqueInput,
      productId,
      updateItemQuantityDto,
    );
  }

  // rota de desenvolvimento
  async deleteCart(cartWhereUniqueInput: Prisma.CartWhereUniqueInput) {
    return await this.cartRepository.deleteCart(cartWhereUniqueInput);
  }
}
