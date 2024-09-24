import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/')
  async getOrders() {
    await this.orderService.orders();
  }

  @Get('/:id')
  async getOrderById(@Param('id') id: string) {
    await this.orderService.order({ id });
  }
}
