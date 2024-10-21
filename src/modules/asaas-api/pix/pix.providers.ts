import { PixRepository } from './repositories/pix-repository';
import { PixServiceRepository } from './repositories/pix-service-repository';

export const pixProviders = [
  {
    provide: PixRepository, // solicitando essa
    useClass: PixServiceRepository, // essa será usada
  },
];
