export class PayQrCodeDto {
  qrCode: {
    payload?: string;
    changeValue?: number;
  };
  value: number;
  description?: string;
  scheduleDate?: string;
}
