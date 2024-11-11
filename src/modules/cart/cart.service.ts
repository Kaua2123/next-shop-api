import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CartNotFound } from './errors/cart-not-found';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async cart(cartWhereUniqueInput: Prisma.CartWhereUniqueInput) {
    const cart = await this.prisma.cart.findFirst({
      where: cartWhereUniqueInput,
    });

    if (!cart) throw new CartNotFound();

    return cart;
  }
}
