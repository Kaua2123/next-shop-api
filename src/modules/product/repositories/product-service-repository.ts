import { PrismaService } from 'src/database/prisma.service';
import { ProductRepository } from './product-repository';
import { Prisma, Product } from '@prisma/client';
import { ProductNotFound } from '../errors/product-not-found';
import { MissingId } from 'src/errors/missing-id';
import { Injectable } from '@nestjs/common';
import { MissingFields } from 'src/errors/missing-fields';

@Injectable()
export class ProductServiceRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async products(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();

    if (!products) throw new ProductNotFound();

    return products;
  }

  async product(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product> {
    const product = await this.prisma.product.findFirst({
      where: productWhereUniqueInput,
    });

    if (!product) throw new ProductNotFound();

    return product;
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    const { name, description, price, stock, image_url, category } = data;

    if (!name || !description || !price || !stock || !image_url || !category)
      throw new MissingFields();

    return await this.prisma.product.create({
      data,
    });
  }

  async updateProduct(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    if (!productWhereUniqueInput) throw new MissingId();

    const productExists = await this.prisma.product.findFirst({
      where: productWhereUniqueInput,
    });

    if (!productExists) throw new ProductNotFound();

    const product = await this.prisma.product.update({
      where: productWhereUniqueInput,
      data,
    });

    return product;
  }

  async updateProductDisponibility(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<{ productId: string; isDisponible: boolean }> {
    if (!productWhereUniqueInput) throw new MissingId();

    const productExists = await this.prisma.product.findFirst({
      where: productWhereUniqueInput,
    });

    if (!productExists) throw new ProductNotFound();

    const product = await this.prisma.product.update({
      where: productWhereUniqueInput,
      data,
    });

    return {
      productId: product.id,
      isDisponible: product.isDisponible,
    };
  }

  async updateProductCategory(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<{ productId: string; category: string }> {
    if (!productWhereUniqueInput) throw new MissingId();

    const productExists = await this.prisma.product.findFirst({
      where: productWhereUniqueInput,
    });

    if (!productExists) throw new ProductNotFound();

    const product = await this.prisma.product.update({
      where: productWhereUniqueInput,
      data,
    });

    return {
      productId: product.id,
      category: product.category,
    };
  }
}
