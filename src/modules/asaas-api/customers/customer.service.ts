import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { ICustomer } from 'src/definitions';

@Injectable()
export class CustomerService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://sandbox.asaas.com/api/';
  private readonly url = `${this.baseUrl}/v3/customers`;
  private readonly config = {
    headers: {
      access_token: process.env.API_KEY,
    },
  };

  async customer(id: string) {
    const response = await lastValueFrom(
      this.httpService.get(this.url + '/' + id, this.config),
    );

    // trocar por um error dps
    if (!response.data)
      return {
        message: 'customer não encontrado.',
      };

    return response.data;
  }

  async customers(): Promise<ICustomer[] | { message: string }> {
    // nest js retorna um observable ao manipular o httpService (que usa o axios)
    // por isso devemos torná-lo uma promise, com o lastValueFrom.
    const response = await lastValueFrom(
      this.httpService.get(this.url, this.config),
    );

    // trocar por um error dps
    if (!response.data)
      return {
        message: 'customers não encontrado.',
      };

    return response.data;
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<ICustomer> {
    const response = await lastValueFrom(
      this.httpService.post(this.url, createCustomerDto, this.config),
    );

    return response.data;
  }
}
