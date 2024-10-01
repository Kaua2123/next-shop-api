import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order-dto';

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

  @Post('/create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @Post('/checkout/:id')
  async checkout(@Param('id') id: string) {
    return await this.orderService.checkout({ id });
  }
}
