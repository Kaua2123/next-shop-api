import { PaymentRepository } from './repositories/payment-repository';
import { PaymentServiceRepository } from './repositories/payment-service-repository';

export const paymentProviders = [
  {
    provide: PaymentRepository, // solicitando essa classe
    useClass: PaymentServiceRepository, // essa será usada.
  },
];
