import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer-dto';

@Controller('/asaas')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/get/customer/:id')
  async findCustomerById(@Param('id') id: string) {
    return await this.customerService.customer(id);
  }

  @Get('/get/customers')
  async getCustomers() {
    return await this.customerService.customers();
  }

  @Post('/create/customer')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.createCustomer(createCustomerDto);
  }
}
