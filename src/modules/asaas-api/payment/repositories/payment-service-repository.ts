import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment-repository';
import { IPayment } from 'src/definitions';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { PaymentNotFound } from '../error/payment-not-found';
import { CreatePaymentDto } from '../dto/create-payment-dto';

@Injectable()
export class PaymentServiceRepository implements PaymentRepository {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://sandbox.asaas.com/api/';
  private readonly url = `${this.baseUrl}/v3/payments`;
  private readonly config = {
    headers: {
      access_token: process.env.API_KEY,
    },
  };

  async payments(): Promise<IPayment[]> {
    const response = await lastValueFrom(
      this.httpService.get(this.url, this.config).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status == 404) throw new PaymentNotFound();

          throw new Error('Request failed');
        }),
      ),
    );

    return response.data;
  }

  async payment(id: string): Promise<IPayment> {
    const response = await lastValueFrom(
      this.httpService.get(this.url + '/' + id, this.config).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status == 404) throw new PaymentNotFound();

          throw new Error('Request failed');
        }),
      ),
    );

    return response.data;
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<IPayment> {
    const response = await lastValueFrom(
      this.httpService.post(this.url, createPaymentDto, this.config).pipe(
        catchError((error: AxiosError) => {
          console.error('Request failed', error);
          throw error.response.data;
        }),
      ),
    );

    return response.data;
  }
}
