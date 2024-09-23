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

  // ação do(s) adm(s) do ecommerce
  async createProduct(data: Prisma.ProductCreateInput) {
    return await this.prisma.product.create({
      data,
    });
  }
  // ação do(s) adm(s) do ecommerce
  async updateProduct(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ) {
    const product = await this.prisma.product.update({
      where: productWhereUniqueInput,
      data,
    });

    return product;
  }
  // ação do(s) adm(s) do ecommerce
  async disponibility(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ) {
    const product = await this.prisma.product.update({
      where: productWhereUniqueInput,
      data,
    });

    return {
      productId: product.id,
      isDisponible: product.isDisponible,
    };
  }
}
