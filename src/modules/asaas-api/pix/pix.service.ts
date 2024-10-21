import { Injectable } from '@nestjs/common';
import { PayQrCodeDto } from './dto/pay-qr-code-dto';
import { PixRepository } from './repositories/pix-repository';

@Injectable()
export class PixService {
  constructor(private readonly pixRepository: PixRepository) {}

  async pixQrCode(paymentId: string) {
    await this.pixRepository.pixQrCode(paymentId);
  }

  async payQrCode(payQrCodeDto: PayQrCodeDto) {
    await this.pixRepository.payQrCode(payQrCodeDto);
  }
}
