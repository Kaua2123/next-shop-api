import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreatePaymentDto } from './dto/create-payment-dto';
import { PaymentNotFound } from './error/payment-not-found';

@Injectable()
export class PaymentService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://sandbox.asaas.com/api/';
  private readonly url = `${this.baseUrl}/v3/payments`;
  private readonly config = {
    headers: {
      access_token: process.env.API_KEY,
    },
  };

  async payments() {
    const response = await lastValueFrom(
      this.httpService.get(this.url, this.config),
    );

    if (!response.data) throw new PaymentNotFound();

    return response.data;
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const response = await lastValueFrom(
      this.httpService.post(this.url, createPaymentDto, this.config),
    );

    return response.data;
  }
}
