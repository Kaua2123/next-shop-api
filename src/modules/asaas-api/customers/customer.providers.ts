import { CustomerRepository } from './repositories/customer-repository';
import { CustomerServiceRepository } from './repositories/customer-service-repository';

export const customerProviders = [
  {
    provide: CustomerRepository, // solicitando esse tipo
    useClass: CustomerServiceRepository, // usará esse
  },
];
