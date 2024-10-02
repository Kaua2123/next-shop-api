import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { ICustomer } from 'src/definitions';

@Controller('/asaas')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/get/customers/:id')
  async findCustomerById(@Param('id') id: string): Promise<ICustomer> {
    return await this.customerService.customer(id);
  }

  @Get('/get/customers')
  async getCustomers(): Promise<ICustomer[] | { message: string }> {
    return await this.customerService.customers();
  }

  @Post('/create/customer')
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<ICustomer> {
    return await this.customerService.createCustomer(createCustomerDto);
  }
}
