import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CustomerService } from './customers/customer.service';
import { PaymentService } from './payment/payment.service';
import { CustomerController } from './customers/customer.controller';
import { PaymentController } from './payment/payment.controller';

@Module({
  imports: [HttpModule],
  controllers: [CustomerController, PaymentController],
  providers: [CustomerService, PaymentService],
})
export class AsaasModule {}
