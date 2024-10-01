import { Body, Controller, Post } from '@nestjs/common';
import { AsaasService } from './asaas.service';
import { CreateClientDto } from './dto/create-client-dto';

@Controller('/asaas')
export class AsaasController {
  constructor(private readonly asaasService: AsaasService) {}

  @Post('/create/customers')
  async createClient(@Body() createClientDto: CreateClientDto) {
    return await this.asaasService.createClient(createClientDto);
  }
}
