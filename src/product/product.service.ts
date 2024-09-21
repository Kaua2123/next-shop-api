import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async products() {
    const products = await this.prisma.product.findMany();

    return products;
  }

  async product(productWhereUniqueInput: Prisma.ProductWhereUniqueInput) {
    const product = await this.prisma.product.findFirst({
      where: productWhereUniqueInput,
    });

    return product;
  }

  // ação do(s) adm do ecommerce
  async createProduct() {}
  // ação do(s) adm do ecommerce
  async updateProduct() {}
  // ação do(s) adm do ecommerce
  async deleteProduct() {}
}
