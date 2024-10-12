import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaService } from 'src/database/prisma.service';
import { ProductController } from './product.controller';
import { productProviders } from './product.providers';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [PrismaService, ProductService, ...productProviders],
})
export class ProductModule {}
