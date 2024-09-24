import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async orders() {
    const orders = await this.prisma.order.findMany();

    return orders;
  }

  async order(orderWhereUniqueInput: Prisma.OrderWhereUniqueInput) {
    const order = await this.prisma.order.findFirst({
      where: orderWhereUniqueInput,
    });

    return order;
  }

  async createOrder() {}
  async cancelOrder() {}
}
