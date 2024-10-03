import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { CustomerService } from '../asaas-api/customers/customer.service';
import { PaymentService } from '../asaas-api/payment/payment.service';
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
    createPaymentDto: CreatePaymentDto,
    customerId?: string,
  ) {
    const order = await this.prisma.order.findFirst({
      where: orderWhereUniqueInput,
      include: {
        user: true,
      },
    });

    const customerExists =
      customerId && (await this.customerService.customer(customerId));

    const { user } = order;

    const customer =
      customerExists && customerId != null // se foi passado um id e o cliente existe
        ? customerExists
        : await this.customerService.createCustomer({
            // se não foi passado nenhum id, provavelmente o cliente nao existe.
            // porém, há casos em que o id simplesmente não foi recebido por algum motivo.
            // por isso, a condição verifica se existe, primeiro, um cliente.
            // depois verifica se o id foi fornecido TAMBÉM.
            name: user.name,
            cpfCnpj: user.cpfCnpj,
          });

    const payment = await this.paymentService.createPayment({
      customer: customer.id,
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
