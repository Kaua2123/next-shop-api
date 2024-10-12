import { Prisma, Product } from '@prisma/client';

export abstract class ProductRepository {
  abstract products(): Promise<Product[]>;

  abstract product(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product>;

  abstract createProduct(data: Prisma.ProductCreateInput): Promise<Product>;

  abstract updateProduct(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product>;

  abstract updateProductDisponibility(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<{ productId: string; isDisponible: boolean }>;

  abstract updateProductCategory(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
    data: Prisma.ProductUpdateInput,
  ): Promise<{ productId: string; category: string }>;
}
