import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { CreatePaymentDto } from '../asaas-api/payment/dto/create-payment-dto';
import { CreateCustomerDto } from '../asaas-api/customers/dto/create-customer-dto';

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

  @Post('/checkout/:id/:customerId')
  async checkout(
    @Param('id') id: string,
    @Param('customerId') customerId: string,
    @Body() createPaymentDTO: CreatePaymentDto,
    @Body() createCustomerDto?: CreateCustomerDto,
  ) {
    return await this.orderService.checkout(
      { id },
      customerId,
      createPaymentDTO,
      createCustomerDto,
    );
  }
}
