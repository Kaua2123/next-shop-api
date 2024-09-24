import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/database/prisma.service';
import { OrderService } from './order.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [PrismaService, OrderService],
})
export class OrderModule {}
