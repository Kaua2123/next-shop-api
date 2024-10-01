import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client-dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AsaasService {
  constructor(private readonly httpService: HttpService) {}
  private readonly baseUrl = 'https://sandbox.asaas.com/api/';

  async createClient(createClientDto: CreateClientDto) {
    const url = `${this.baseUrl}/v3/customers`;
    const config = {
      headers: {
        access_token: process.env.API_KEY,
      },
    };

    const response = await lastValueFrom(
      this.httpService.post(url, createClientDto, config),
    );

    return response.data;
  }
}
