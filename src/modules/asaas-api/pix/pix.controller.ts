import { Controller, Get, Param } from '@nestjs/common';
import { PixService } from './pix.service';

@Controller('/asaas')
export class PixController {
  constructor(private readonly pixService: PixService) {}

  @Get('/pix/pixQrCode/:id')
  async pixQrCode(@Param('id') id: string) {
    return await this.pixService.pixQrCode(id);
  }
}
