import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment-dto';

@Controller('/asaas')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/get/payments/:id')
  async findPaymentById(@Param('id') id: string) {
    return await this.paymentService.payment(id);
  }

  @Get('/get/payments')
  async getPayments() {
    return await this.paymentService.payments();
  }

  @Post('/create/payment')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.createPayment(createPaymentDto);
  }
}
