import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CartNotFound } from './errors/cart-not-found';
import { CreateCartDto } from './dto/create-cart-dto';
import { AddItemsToCartDto } from './dto/add-items-to-cart-dto';
import { ProductNotFound } from '../product/errors/product-not-found';
import { UpdateItemQuantityDto } from './dto/update-item-quantity-dto';

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
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
    addItemsToCartDto: AddItemsToCartDto,
  ) {
    const { items } = addItemsToCartDto;

    const cartExists = await this.prisma.cart.findFirst({
      where: cartWhereUniqueInput,
      include: {
        cart_items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cartExists) throw new CartNotFound();

    items.map(async (item) => {
      const productsInCart = await this.prisma.cartItems.findMany({
        where: {
          cartId: cartWhereUniqueInput.id,
          productId: item.productId,
        },
      });

      if (productsInCart.length > 0) {
        const cart = await this.prisma.cart.update({
          where: cartWhereUniqueInput,
          data: {
            cart_items: {
              updateMany: {
                where: {
                  cartId: cartWhereUniqueInput.id,
                  productId: item.productId,
                },
                data: {
                  quantity: {
                    increment: 1, // incrementa o valor de quantidade em 1. (quantity = quantity + 1)
                  },
                },
              },
            },
          },
        });

        if (!cart) throw new CartNotFound();
      } else {
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
            },
          },
        });

        if (!cart) throw new CartNotFound();
      }
    });

    return {
      message: 'product added',
    };
  }

  // remove o produto do carrinho, independente de sua quantidade.
  async removeItemFromCart(cartId: string, productIdToRemove: string) {
    const cart = await this.prisma.cart.findFirst({
      where: { id: cartId },
      include: {
        cart_items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) throw new CartNotFound();

    const productInCart = await this.prisma.cartItems.findFirst({
      where: {
        productId: productIdToRemove,
      },
    });

    if (!productInCart) throw new ProductNotFound();

    await this.prisma.cartItems.deleteMany({
      // deletando com base no id do carrinho e do produto em um registro de cart items
      where: {
        cartId,
        productId: productIdToRemove,
      },
    });

    return { removedProduct: productInCart };
  }

  async updateItemQuantity(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
    productId: string,
    updateItemQuantityDto: UpdateItemQuantityDto,
  ) {
    const { quantity } = updateItemQuantityDto;

    const cartExists = await this.prisma.cart.findFirst({
      where: cartWhereUniqueInput,
    });

    if (!cartExists) throw new CartNotFound();

    await this.prisma.cartItems.updateMany({
      where: {
        cartId: cartWhereUniqueInput.id,
        productId,
      },
      data: {
        quantity, // passando a nova quantidade fornecida.
      },
    });
  }
}
