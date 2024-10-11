import { UserRepository } from './repositories/user-repository';
import { UserServiceRepository } from './repositories/user-service-repository';

export const userProviders = [
  {
    provide: UserRepository, // solicitando classe desse tipo...
    useClass: UserServiceRepository, // essa será usada.
  },
];
