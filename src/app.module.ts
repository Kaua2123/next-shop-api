import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
