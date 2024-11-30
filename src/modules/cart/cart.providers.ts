import { CartRepository } from './repositories/cart-repository';
import { CartServiceRepository } from './repositories/cart-service-repository';

export const cartProviders = [
  {
    provide: CartRepository, // ao solicitar essa,
    useClass: CartServiceRepository, // essa é usada.
  },
];
