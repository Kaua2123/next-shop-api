import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/database/prisma.service';
import { OrderService } from './order.service';
import { AsaasModule } from '../asaas-api/asaas.module';
import { HttpModule } from '@nestjs/axios';
import { orderProviders } from './order.providers';
import { customerProviders } from '../asaas-api/customers/customer.providers';
import { paymentProviders } from '../asaas-api/payment/payment.providers';

@Module({
  imports: [AsaasModule, HttpModule],
  controllers: [OrderController],
  providers: [
    PrismaService,
    OrderService,
    ...orderProviders,
    ...customerProviders,
    ...paymentProviders,
  ],
})
export class OrderModule {}
