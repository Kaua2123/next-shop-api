import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ProductNotFound } from './errors/product-not-found';
import { MissingId } from 'src/errors/missing-id';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async products() {
    const products = await this.prisma.product.findMany();

    if (!products) throw new ProductNotFound();

    return products;
  }

  async product(productWhereUniqueInput: Prisma.ProductWhereUniqueInput) {
    const product = await this.prisma.product.findFirst({
      where: productWhereUniqueInput,
    });

    if (!product) throw new ProductNotFound();

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
    if (!productWhereUniqueInput) throw new MissingId();

    const product = await this.prisma.product.update({
      where: productWhereUniqueInput,
      data,
    });

    if (!product) throw new ProductNotFound();

    return product;
  }
  // ação do(s) adm(s) do ecommerce
  async updateProductDisponibility(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ) {
    if (!productWhereUniqueInput) throw new MissingId();

    const product = await this.prisma.product.update({
      where: productWhereUniqueInput,
      data,
    });

    if (!product) throw new ProductNotFound();

    return {
      productId: product.id,
      isDisponible: product.isDisponible,
    };
  }

  async updateProductCategory(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ) {
    if (!productWhereUniqueInput) throw new MissingId();

    const product = await this.prisma.product.update({
      where: productWhereUniqueInput,
      data,
    });

    if (!product) throw new ProductNotFound();

    return {
      productId: product.id,
      category: product.category,
    };
  }
}
