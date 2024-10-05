import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { PayQrCodeDto } from './dto/pay-qr-code-dto';
import { AxiosError } from 'axios';
import { MissingId } from 'src/errors/missing-id';
import { QrCodeNotFound } from './errors/qr-code-not-found';

@Injectable()
export class PixService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://sandbox.asaas.com/api/';
  private readonly url = `${this.baseUrl}/v3/payments`;
  private readonly pixUrl = `${this.baseUrl}/v3/pix`;
  private readonly config = {
    headers: {
      access_token: process.env.API_KEY,
    },
  };

  async pixQrCode(paymentId: string) {
    if (!paymentId) throw new MissingId();

    const url = this.url + '/' + paymentId + '/pixQrCode';

    const response = await lastValueFrom(
      this.httpService.get(url, this.config).pipe(
        catchError((error: AxiosError) => {
          throw error.response.data;
        }),
      ),
    );

    if (!response) throw new QrCodeNotFound();

    return response.data;
  }

  async payQrCode(payQrCodeDto: PayQrCodeDto) {
    // if (!payQrCodeDto.qrCode.payload) -> lançar um erro
    // if (!payQrCodeDto.qrCode.changeValue) -> lançar um erro
    const url = this.pixUrl + '/qrCodes/pay';

    const response = await lastValueFrom(
      this.httpService.post(url, payQrCodeDto, this.config).pipe(
        catchError((error: AxiosError) => {
          throw error.response.data;
        }),
      ),
    );

    return response.data;
  }
}
