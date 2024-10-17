import { ICustomer } from 'src/definitions';
import { CreateCustomerDto } from '../dto/create-customer-dto';

export abstract class CustomerRepository {
  abstract customers(): Promise<ICustomer[]>;
  abstract customer(id: string): Promise<ICustomer>;
  abstract createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<ICustomer>;
}
