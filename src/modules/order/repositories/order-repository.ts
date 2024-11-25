import { Order, Prisma } from '@prisma/client';
import { IPayment } from 'src/definitions';
import { CreatePaymentDto } from 'src/modules/asaas-api/payment/dto/create-payment-dto';
import { CreateOrderDto } from '../dto/create-order-dto';

export abstract class OrderRepository {
  abstract orders(): Promise<Order[]>;

  abstract order(
    orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
  ): Promise<Order>;

  abstract userOrders(userId: number): Promise<Order[]>;

  abstract createOrder(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
    createOrderDto: CreateOrderDto,
  ): Promise<{ order: Order }>;

  abstract checkout(
    orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
    createPaymentDto: CreatePaymentDto,
    customerId?: string,
  ): Promise<{ order: Order; payment: IPayment }>;

  //   abstract cancelOrder();
}
