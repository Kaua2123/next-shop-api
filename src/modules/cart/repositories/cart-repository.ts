import { Cart, CartItems, Prisma } from '@prisma/client';
import { CreateCartDto } from '../dto/create-cart-dto';
import { AddItemsToCartDto } from '../dto/add-items-to-cart-dto';
import { UpdateItemQuantityDto } from '../dto/update-item-quantity-dto';

export abstract class CartRepository {
  abstract carts(): Promise<Cart[]>;

  abstract cart(cartWhereUniqueInput: Prisma.CartWhereUniqueInput): Promise<{
    id: string;
    userId: number;
    subtotal: number | null;
    created_at: Date;
    cart_items: CartItems[];
  }>;

  abstract createCartWithItems(createCartDto: CreateCartDto): Promise<Cart>;

  abstract addItemsToCart(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
    addItemsToCartDto: AddItemsToCartDto,
  ): Promise<{ message: string }>;

  abstract removeItemFromCart(
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
  }>;

  abstract updateItemQuantity(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
    productId: string,
    updateItemQuantityDto: UpdateItemQuantityDto,
  ): Promise<{ message: string }>;

  abstract deleteCart(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
  ): Promise<{ message: string; cart: Cart }>;
}
