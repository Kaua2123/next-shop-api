import { OrderRepository } from './repositories/order-repository';
import { OrderServiceRepository } from './repositories/order-service-repository';

export const orderProviders = [
  {
    provide: OrderRepository, // solicitando essa,
    useClass: OrderServiceRepository, // essa será usada
  },
];
