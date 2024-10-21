import { PayQrCodeDto } from '../dto/pay-qr-code-dto';

export abstract class PixRepository {
  abstract pixQrCode(paymentId: string): Promise<string>;
  abstract payQrCode(payQrCodeDto: PayQrCodeDto): Promise<string>;
}
