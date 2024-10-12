import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductRepository } from './repositories/product-repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async products() {
    return await this.productRepository.products();
  }

  async product(productWhereUniqueInput: Prisma.ProductWhereUniqueInput) {
    return await this.productRepository.product(productWhereUniqueInput);
  }

  // ação do(s) adm(s) do ecommerce
  async createProduct(data: Prisma.ProductCreateInput) {
    return await this.productRepository.createProduct(data);
  }

  async updateProduct(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ) {
    return await this.productRepository.updateProduct(
      productWhereUniqueInput,
      data,
    );
  }

  // ação do(s) adm(s) do ecommerce
  async updateProductDisponibility(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ) {
    return await this.productRepository.updateProductDisponibility(
      productWhereUniqueInput,
      data,
    );
  }

  async updateProductCategory(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ) {
    return await this.productRepository.updateProductCategory(
      productWhereUniqueInput,
      data,
    );
  }
}
