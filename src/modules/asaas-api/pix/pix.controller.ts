import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PixService } from './pix.service';
import { PayQrCodeDto } from './dto/pay-qr-code-dto';

@Controller('/asaas')
export class PixController {
  constructor(private readonly pixService: PixService) {}

  @Get('/pix/pixQrCode/:id')
  async pixQrCode(@Param('id') id: string) {
    return await this.pixService.pixQrCode(id);
  }

  @Post('/pix/payQrCode')
  async payQrCode(@Body() payQrCodeDto: PayQrCodeDto) {
    return await this.pixService.payQrCode(payQrCodeDto);
  }
}
