import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PixService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://sandbox.asaas.com/api/';
  private readonly url = `${this.baseUrl}/v3/payments`;
  private readonly config = {
    headers: {
      access_token: process.env.API_KEY,
    },
  };

  async pixQrCode(paymentId: string) {
    const url = this.url + '/' + paymentId + '/pixQrCode';

    const response = await lastValueFrom(
      this.httpService.get(url, this.config),
    );

    return response.data;
  }
}
