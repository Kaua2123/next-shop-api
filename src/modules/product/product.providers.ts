import { ProductRepository } from './repositories/product-repository';
import { ProductServiceRepository } from './repositories/product-service-repository';

export const productProviders = [
  {
    provide: ProductRepository, // solicitando essa,
    useClass: ProductServiceRepository, // se usa essa.
  },
];
