import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment-dto';

@Controller('/asaas')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/get/payments')
  async getPayments() {
    return await this.paymentService.payments();
  }

  @Post('/create/payment')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.createPayment(createPaymentDto);
  }
}