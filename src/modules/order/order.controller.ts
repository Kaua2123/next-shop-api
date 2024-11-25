import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { CreatePaymentDto } from '../asaas-api/payment/dto/create-payment-dto';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/')
  async getOrders() {
    return await this.orderService.orders();
  }

  @Get('/:id')
  async getOrderById(@Param('id') id: string) {
    return await this.orderService.order({ id });
  }

  @Get('/userOrder/:userId')
  async getUserOrders(@Param('userId') userId: number) {
    return await this.orderService.userOrders(userId);
  }

  @Post('/create/:cartId')
  async createOrder(
    @Param('cartId') id: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return await this.orderService.createOrder({ id }, createOrderDto);
  }

  @Post('/checkout/:id/:customerId?') // interrogaçao pra indicar q o parametro é opcional.
  async checkout(
    @Param('id') id: string,
    @Body() createPaymentDTO: CreatePaymentDto,
    @Param('customerId') customerId?: string,
  ) {
    return await this.orderService.checkout(
      { id },
      createPaymentDTO,
      customerId,
    );
  }
}
