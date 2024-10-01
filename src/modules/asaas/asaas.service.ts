import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AsaasService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://sandbox.asaas.com/api/';
  private readonly customersUrl = `${this.baseUrl}/v3/customers`;
  private readonly config = {
    headers: {
      access_token: process.env.API_KEY,
    },
  };

  async clients() {
    const response = await lastValueFrom(
      this.httpService.get(this.customersUrl, this.config),
    );

    return response.data;
  }

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const response = await lastValueFrom(
      this.httpService.post(this.customersUrl, createCustomerDto, this.config),
    );

    return response.data;
  }
}
