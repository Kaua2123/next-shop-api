import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/database/prisma.service';
import { OrderService } from './order.service';
import { AsaasModule } from '../asaas-api/asaas.module';
import { HttpModule } from '@nestjs/axios';
import { orderProviders } from './order.providers';
import { CustomerService } from '../asaas-api/customers/customer.service';
import { PaymentService } from '../asaas-api/payment/payment.service';

@Module({
  imports: [AsaasModule, HttpModule],
  controllers: [OrderController],
  providers: [
    PrismaService,
    OrderService,
    CustomerService,
    PaymentService,
    ...orderProviders,
  ],
})
export class OrderModule {}
