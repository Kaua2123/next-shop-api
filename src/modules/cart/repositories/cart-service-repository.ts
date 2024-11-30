import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CartRepository } from './cart-repository';
import { Cart, CartItems, Prisma } from '@prisma/client';
import { CreateCartDto } from '../dto/create-cart-dto';
import { AddItemsToCartDto } from '../dto/add-items-to-cart-dto';
import { UpdateItemQuantityDto } from '../dto/update-item-quantity-dto';
import { CartNotFound } from '../errors/cart-not-found';
import { ProductNotFound } from 'src/modules/product/errors/product-not-found';

@Injectable()
export class CartServiceRepository implements CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async carts(): Promise<Cart[]> {
    const carts = await this.prisma.cart.findMany();

    if (!carts) throw new CartNotFound();

    return carts;
  }

  async cart(cartWhereUniqueInput: Prisma.CartWhereUniqueInput): Promise<{
    id: string;
    userId: number;
    subtotal: number | null;
    created_at: Date;
    cart_items: CartItems[];
  }> {
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

  async createCartWithItems(createCartDto: CreateCartDto): Promise<Cart> {
    const { id, created_at, user_id, items } = createCartDto;

    const cart = await this.prisma.cart.create({
      data: {
        id,
        created_at,
        subtotal: items.reduce(
          (acc, item) => item.price * item.quantity + acc,
          0,
        ),
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
  ): Promise<{ message: string }> {
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

      if (!productsInCart) throw new ProductNotFound();

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
                    increment: item.quantity, // agora, incrementando a quantidade passada.
                  },
                },
              },
            },
            subtotal: {
              increment: item.price,
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

  async removeItemFromCart(
    cartId: string,
    productIdToRemove: string,
  ): Promise<{
    removedProduct: {
      id: string;
      created_at: Date;
      price: number;
      quantity: number;
      productId: string;
      cartId: string;
    };
  }> {
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
  ): Promise<{ message: string }> {
    const { quantity } = updateItemQuantityDto;

    const cartExists = await this.prisma.cart.findFirst({
      where: cartWhereUniqueInput,
    });
    const productExists = await this.prisma.product.findFirst({
      where: { id: productId },
    });

    if (!cartExists) throw new CartNotFound();
    if (!productExists) throw new ProductNotFound();

    await this.prisma.cartItems.updateMany({
      where: {
        cartId: cartWhereUniqueInput.id,
        productId,
      },
      data: {
        quantity, // passando a nova quantidade fornecida.
      },
    });

    return {
      message: 'quantity updated',
    };
  }

  async deleteCart(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
  ): Promise<{ message: string; cart: Cart }> {
    const cart = await this.prisma.cart.delete({ where: cartWhereUniqueInput });

    return {
      message: 'deleted',
      cart,
    };
  }
}
