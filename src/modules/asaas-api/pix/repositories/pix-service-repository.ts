import { Injectable } from '@nestjs/common';
import { PixRepository } from './pix-repository';
import { HttpService } from '@nestjs/axios';
import { PayQrCodeDto } from '../dto/pay-qr-code-dto';
import { MissingId } from 'src/errors/missing-id';
import { catchError, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { QrCodeNotFound } from '../errors/qr-code-not-found';

@Injectable()
export class PixServiceRepository implements PixRepository {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'https://sandbox.asaas.com/api/';
  private readonly url = `${this.baseUrl}/v3/payments`;
  private readonly pixUrl = `${this.baseUrl}/v3/pix`;
  private readonly config = {
    headers: {
      access_token: process.env.API_KEY,
    },
  };

  async pixQrCode(paymentId: string): Promise<string> {
    if (!paymentId) throw new MissingId();

    const url = this.url + '/' + paymentId + '/pixQrCode';

    const response = await lastValueFrom(
      this.httpService.get(url, this.config).pipe(
        catchError((error: AxiosError) => {
          console.error('Request failed');
          throw error.response.data;
        }),
      ),
    );

    if (!response.data) throw new QrCodeNotFound();

    return response.data;
  }

  async payQrCode(payQrCodeDto: PayQrCodeDto): Promise<string> {
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
