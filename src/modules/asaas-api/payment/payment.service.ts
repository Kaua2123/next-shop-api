import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment-dto';
import { PaymentRepository } from './repositories/payment-repository';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async payments() {
    await this.paymentRepository.payments();
  }

  async payment(id: string) {
    await this.paymentRepository.payment(id);
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    await this.paymentRepository.createPayment(createPaymentDto);
  }
}
