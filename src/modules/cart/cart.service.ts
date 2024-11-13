import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CartNotFound } from './errors/cart-not-found';
import { CreateCartDto } from './dto/create-cart-dto';

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

  async createCart(createCartDto: CreateCartDto) {
    const { id, created_at, user_id } = createCartDto;

    return await this.prisma.cart.create({
      data: {
        id,
        created_at,
        user: {
          // ligação com a tabela user
          connect: { id: user_id },
        },
      },
    });
  }

  async addItemsToCart() {}
}
