import { Body, Controller, Get, Post } from '@nestjs/common';
import { AsaasService } from './asaas.service';
import { CreateCustomerDto } from './dto/create-customer-dto';
import { CreatePaymentDto } from './dto/create-payment-dto';

@Controller('/asaas')
export class AsaasController {
  constructor(private readonly asaasService: AsaasService) {}

  @Get('/get/customers')
  async getCustomers() {
    return await this.asaasService.clients();
  }

  @Get('/get/payments')
  async getPayments() {
    return await this.asaasService.payments();
  }

  @Post('/create/customer')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.asaasService.createCustomer(createCustomerDto);
  }

  @Post('/create/payment')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.asaasService.createPayment(createPaymentDto);
  }
}
