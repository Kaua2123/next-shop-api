import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer-dto';

@Controller('/asaas')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/get/customers')
  async getCustomers() {
    return await this.customerService.clients();
  }

  @Post('/create/customer')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.createCustomer(createCustomerDto);
  }
}
