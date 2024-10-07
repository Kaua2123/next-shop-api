import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment-dto';
import { IPayment } from 'src/definitions';

@Controller('/asaas')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/get/payments/:id')
  async findPaymentById(@Param('id') id: string): Promise<IPayment> {
    return await this.paymentService.payment(id);
  }

  @Get('/get/payments')
  async getPayments(): Promise<IPayment[]> {
    return await this.paymentService.payments();
  }

  @Post('/create/payment')
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<IPayment> {
    return await this.paymentService.createPayment(createPaymentDto);
  }
}
