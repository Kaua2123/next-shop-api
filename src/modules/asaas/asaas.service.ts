import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { lastValueFrom } from 'rxjs';
import { CreatePaymentDto } from './dto/create-payment-dto';

@Injectable()
export class AsaasService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://sandbox.asaas.com/api/';
  private readonly customersUrl = `${this.baseUrl}/v3/customers`;
  private readonly paymentsUrl = `${this.baseUrl}/v3/payments`;
  private readonly config = {
    headers: {
      access_token: process.env.API_KEY,
    },
  };

  async clients() {
    // nest js retorna um observable ao manipular o httpService (que usa o axios)
    // por isso devemos torná-lo uma promise, com o lastValueFrom.
    const response = await lastValueFrom(
      this.httpService.get(this.customersUrl, this.config),
    );

    return response.data;
  }

  async payments() {
    const response = await lastValueFrom(
      this.httpService.get(this.paymentsUrl, this.config),
    );

    return response.data;
  }

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const response = await lastValueFrom(
      this.httpService.post(this.customersUrl, createCustomerDto, this.config),
    );

    return response.data;
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const response = await lastValueFrom(
      this.httpService.post(this.paymentsUrl, createPaymentDto, this.config),
    );

    return response.data;
  }
}
