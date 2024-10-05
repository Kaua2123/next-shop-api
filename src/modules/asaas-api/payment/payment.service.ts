import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { CreatePaymentDto } from './dto/create-payment-dto';
import { PaymentNotFound } from './error/payment-not-found';
import { AxiosError } from 'axios';

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

  async payment(id: string) {
    const response = await lastValueFrom(
      this.httpService.get(this.url + '/' + id, this.config).pipe(
        catchError((error: AxiosError) => {
          throw error.response.data;
        }),
      ),
    );

    if (!response.data) throw new PaymentNotFound();

    return response.data;
  }

  async payments() {
    const response = await lastValueFrom(
      this.httpService.get(this.url, this.config).pipe(
        catchError((error: AxiosError) => {
          throw error.response.data;
        }),
      ),
    );

    if (!response.data) throw new PaymentNotFound();

    return response.data;
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const response = await lastValueFrom(
      this.httpService.post(this.url, createPaymentDto, this.config).pipe(
        catchError((error: AxiosError) => {
          throw error.response.data;
        }),
      ),
    );

    return response.data;
  }
}
