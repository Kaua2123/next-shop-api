import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CartNotFound } from './errors/cart-not-found';
import { CreateCartDto } from './dto/create-cart-dto';
import { AddItemsToCartDto } from './dto/add-items-to-cart-dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async cart(cartWhereUniqueInput: Prisma.CartWhereUniqueInput) {
    const cart = await this.prisma.cart.findFirst({
      where: cartWhereUniqueInput,
      include: {
        cart_items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) throw new CartNotFound();

    return cart;
  }

  async createCartWithItems(createCartDto: CreateCartDto) {
    // posso permtir que crie o carrinho na hora que o usuario querer adicionar algum item ao carrinho.
    // tipo, "adicionar ao carrinho", e nesse momento ele cria o carrinho, com esse item.
    // caso ele tente acessar o carrinho sem adicionar nada ao carrinho, apareceria "nada por aqui. adicione algo ao carrinho"
    // ou coisa assim.

    const { id, created_at, user_id, items } = createCartDto;

    const cart = await this.prisma.cart.create({
      data: {
        id,
        created_at,
        user: {
          // ligação com a tabela user
          connect: { id: user_id },
        },
        cart_items: {
          create: items.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            product: {
              connect: { id: item.productId },
            },
          })),
        },
      },
    });

    return cart;
  }

  async addItemsToCart(
    // e aqui seria a rota de adicionar MAIS itens ao carrinho.
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
    addItemsToCartDto: AddItemsToCartDto,
  ) {
    const { items } = addItemsToCartDto;

    const cart = await this.prisma.cart.update({
      where: cartWhereUniqueInput,
      data: {
        cart_items: {
          create: items.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            product: {
              connect: { id: item.productId },
            },
          })),
        }, // preciso checar se cart items ja tem algum registro antes de criar. mas posso tentar criar sem isso.
      },
    });

    if (!cart) throw new CartNotFound();

    return cart;
  }
}
