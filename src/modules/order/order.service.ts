import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { CustomerService } from '../asaas-api/customers/customer.service';
import { PaymentService } from '../asaas-api/payment/payment.service';
import { CreateCustomerDto } from '../asaas-api/customers/dto/create-customer-dto';
import { CreatePaymentDto } from '../asaas-api/payment/dto/create-payment-dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly customerService: CustomerService,
    private readonly paymentService: PaymentService,
  ) {}

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

  async createOrder(createOrderDto: CreateOrderDto) {
    const { userId, items } = createOrderDto;
    // id tem q ser number
    // quantity tmb
    // items estão aqui no dto, por enquanto
    // são passados via POST.
    // porém, devem vir do carrinho de compras

    const order = await this.prisma.order.create({
      data: {
        total_price: items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
        user: {
          connect: { id: userId },
        },
        order_items: {
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

    return {
      order,
    };
  }

  // usando a api do ASAAS (integraçao com pagamentos)
  async checkout(
    orderWhereUniqueInput: Prisma.OrderWhereUniqueInput,
    customerId: string,
    createPaymentDto: CreatePaymentDto,
    createCustomerDto?: CreateCustomerDto,
  ) {
    const order = await this.prisma.order.findFirst({
      where: orderWhereUniqueInput,
    });

    if (!customerId) return { message: 'missing customerId' };
    const customerExists = await this.customerService.customer(customerId);

    const newCustomer = !!customerExists
      ? customerExists
      : await this.customerService.createCustomer(createCustomerDto);

    const payment = await this.paymentService.createPayment({
      customer: newCustomer.id,
      value: order.total_price,
      ...createPaymentDto,
    });

    return {
      order,
      payment,
    };
  }

  async cancelOrder() {}
}
