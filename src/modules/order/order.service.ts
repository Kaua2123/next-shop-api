import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order-dto';
import { CreatePaymentDto } from '../asaas-api/payment/dto/create-payment-dto';
import { OrderRepository } from './repositories/order-repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async orders() {
    await this.orderRepository.orders();
  }

  async order(orderWhereUniqueInput: Prisma.OrderWhereUniqueInput) {
    await this.orderRepository.order(orderWhereUniqueInput);
  }

  async userOrders(userId: number) {
    await this.orderRepository.userOrders(userId);
  }

  async createOrder(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
    createOrderDto: CreateOrderDto,
  ) {
    await this.orderRepository.createOrder(
      cartWhereUniqueInput,
      createOrderDto,
    );
  }

  // usando a api do ASAAS (integraçao com pagamentos)
  async checkout(
    orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
    createPaymentDto: CreatePaymentDto,
    customerId?: string,
  ) {
    await this.orderRepository.checkout(
      orderWhereUniqueInput,
      createPaymentDto,
      customerId,
    );
  }

  async cancelOrder() {}
}
