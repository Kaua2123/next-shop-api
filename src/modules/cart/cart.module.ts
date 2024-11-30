import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from 'src/database/prisma.service';
import { cartProviders } from './cart.providers';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [CartService, PrismaService, ...cartProviders],
})
export class CartModule {}
