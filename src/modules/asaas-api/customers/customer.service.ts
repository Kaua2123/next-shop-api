import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { ICustomer } from 'src/definitions';
import { CustomerRepository } from './repositories/customer-repository';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async customers(): Promise<ICustomer[]> {
    return await this.customerRepository.customers();
  }

  async customer(id: string): Promise<ICustomer> {
    return await this.customerRepository.customer(id);
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<ICustomer> {
    return await this.customerRepository.createCustomer(createCustomerDto);
  }
}
