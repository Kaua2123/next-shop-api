import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { AsaasModule } from './modules/asaas-api/asaas.module';
import { AuthRequired } from './middlewares/auth.required';
import { ProductController } from './modules/product/product.controller';
import { OrderController } from './modules/order/order.controller';
import { CustomerController } from './modules/asaas-api/customers/customer.controller';
import { PaymentController } from './modules/asaas-api/payment/payment.controller';
import { PixController } from './modules/asaas-api/pix/pix.controller';
import { UserController } from './modules/user/user.controller';
import { CartModule } from './modules/cart/cart.module';
import { IsAdmin } from './middlewares/is-admin';
import { PromotionModule } from './modules/promotion/promotion.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    CartModule,
    AsaasModule,
    PromotionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthRequired)
      .exclude(
        '/product/',
        '/product/:id',
        '/product/create',
        '/product/update/:id',
        '/product/updateProductDisponibility/:id',
        '/product/updateProductCategory/:id',
        '/product/delete/:id',
        '/user/create',
        '/user/',
        '/user/:id',
        '/user/update/:id',
        '/user/delete/:id',
      )
      .forRoutes(
        UserController,
        ProductController,
        OrderController,
        CustomerController,
        PaymentController,
        PixController,
      );
    consumer
      .apply(IsAdmin)
      .exclude(
        '/product/',
        '/product/:id',
        '/asaas/create/customer',
        '/asaas/create/payment',
      )
      .forRoutes(ProductController, CustomerController, PaymentController);
  }
}
