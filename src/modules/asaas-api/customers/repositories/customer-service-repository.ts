import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';
import { ICustomer } from 'src/definitions';
import { AxiosError } from 'axios';
import { CustomerNotFound } from '../errors/customer-not-found';
import { CreateCustomerDto } from '../dto/create-customer-dto';

@Injectable()
export class CustomerServiceRepository {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://sandbox.asaas.com/api/';
  private readonly url = `${this.baseUrl}/v3/customers`;
  private readonly config = {
    headers: {
      access_token: process.env.API_KEY,
    },
  };

  async customer(id: string): Promise<ICustomer> {
    const response = await lastValueFrom(
      this.httpService.get(this.url + '/' + id, this.config).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status == 404) throw new CustomerNotFound();

          throw new Error('Request failed');
        }),
      ),
    );

    return response.data;
  }

  async customers(): Promise<ICustomer[]> {
    // nest js retorna um observable ao manipular o httpService (que usa o axios)
    // por isso devemos torná-lo uma promise, com o lastValueFrom.
    const response = await lastValueFrom(
      this.httpService.get(this.url, this.config).pipe(
        catchError((error: AxiosError) => {
          if (error.response.status == 404) throw new CustomerNotFound();

          throw new Error('Request failed');
        }),
      ),
    );

    return response.data;
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<ICustomer> {
    console.log(createCustomerDto);

    const response = await lastValueFrom(
      this.httpService.post(this.url, createCustomerDto, this.config).pipe(
        catchError((error: AxiosError) => {
          throw error.response.data;
        }),
      ),
    );

    return response.data;
  }
}
