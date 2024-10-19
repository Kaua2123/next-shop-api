import { IPayment } from 'src/definitions';
import { CreatePaymentDto } from '../dto/create-payment-dto';

export abstract class PaymentRepository {
  abstract payments(): Promise<IPayment[]>;
  abstract payment(id: string): Promise<IPayment>;
  abstract createPayment(createPaymentDto: CreatePaymentDto): Promise<IPayment>;
}
