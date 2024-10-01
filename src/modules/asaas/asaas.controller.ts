import { Body, Controller, Get, Post } from '@nestjs/common';
import { AsaasService } from './asaas.service';
import { CreateCustomerDto } from './dto/create-customer-dto';

@Controller('/asaas')
export class AsaasController {
  constructor(private readonly asaasService: AsaasService) {}

  @Get('/get/customers')
  async getCustomers() {
    return await this.asaasService.clients();
  }

  @Post('/create/customers')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.asaasService.createCustomer(createCustomerDto);
  }
}
