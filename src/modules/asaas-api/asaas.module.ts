import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CustomerService } from './customers/customer.service';
import { PaymentService } from './payment/payment.service';
import { CustomerController } from './customers/customer.controller';
import { PaymentController } from './payment/payment.controller';
import { PixController } from './pix/pix.controller';
import { PixService } from './pix/pix.service';
import { customerProviders } from './customers/customer.providers';
import { paymentProviders } from './payment/payment.providers';
import { pixProviders } from './pix/pix.providers';

@Module({
  imports: [HttpModule],
  controllers: [CustomerController, PaymentController, PixController],
  providers: [
    CustomerService,
    PaymentService,
    PixService,
    ...customerProviders,
    ...paymentProviders,
    ...pixProviders,
  ],
})
export class AsaasModule {}
