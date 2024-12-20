import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order-repository';
import { PrismaService } from 'src/database/prisma.service';
import { Order, Prisma } from '@prisma/client';
import { IPayment } from 'src/definitions';
import { OrderNotFound } from '../errors/order-not-found';
import { CreateOrderDto } from '../dto/create-order-dto';
import { CreatePaymentDto } from 'src/modules/asaas-api/payment/dto/create-payment-dto';
import { CustomerRepository } from 'src/modules/asaas-api/customers/repositories/customer-repository';
import { PaymentRepository } from 'src/modules/asaas-api/payment/repositories/payment-repository';
import { CartRepository } from 'src/modules/cart/repositories/cart-repository';

@Injectable() // para torná-lo injetável
export class OrderServiceRepository implements OrderRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customerRepository: CustomerRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly cartRepository: CartRepository,
  ) {}

  async orders(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();

    if (!orders) throw new OrderNotFound();

    return orders;
  }

  async order(
    orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
  ): Promise<Order> {
    const order = await this.prisma.order.findFirst({
      where: orderWhereUniqueInput,
    });

    if (!order) throw new OrderNotFound();

    return order;
  }

  async userOrders(userId: number): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        AND: { userId: Number(userId) },
      },
    });

    if (!orders) throw new OrderNotFound();

    return orders;
  }

  async createOrder(
    cartWhereUniqueInput: Prisma.CartWhereUniqueInput,
    createOrderDto: CreateOrderDto,
  ): Promise<{ order: Order }> {
    const { userId, installmentCount, isInstallment } = createOrderDto;

    const cart = await this.cartRepository.cart(cartWhereUniqueInput);
    const { cart_items } = cart;

    const order = await this.prisma.order.create({
      data: {
        total_price: cart_items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
        isInstallment,
        installmentCount,
        user: {
          connect: { id: userId },
        },
        order_items: {
          create: cart_items.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            product: {
              connect: { id: item.productId },
            },
          })),
        },
      },
    });

    return {
      order,
    };
  }

  async checkout(
    orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
    createPaymentDto: CreatePaymentDto,
    customerId?: string,
  ): Promise<{ order: Order; payment: IPayment }> {
    const order = await this.prisma.order.findFirst({
      where: orderWhereUniqueInput,
      include: {
        user: true,
      },
    });

    if (!order) throw new OrderNotFound();

    const customerExists =
      customerId && (await this.customerRepository.customer(customerId));

    const { user } = order;

    const customer =
      customerExists && customerId != null // se foi passado um id e o cliente existe
        ? customerExists
        : await this.customerRepository.createCustomer({
            // se não foi passado nenhum id, provavelmente o cliente nao existe.
            // porém, há casos em que o id simplesmente não foi recebido por algum motivo.
            // por isso, a condição verifica se existe, primeiro, um cliente.
            // depois verifica se o id foi fornecido TAMBÉM.
            name: user.name,
            cpfCnpj: user.cpfCnpj,
          });

    const payment = await this.paymentRepository.createPayment({
      customer: customer.id,
      value: order.isInstallment ? null : order.total_price,
      totalValue: order.isInstallment ? order.total_price : null,
      installmentCount: order.isInstallment ? order.installmentCount : null,
      ...createPaymentDto,
    });

    return {
      order,
      payment,
    };
  }

  //   async createOrder(): Promise<Order> {}
}
