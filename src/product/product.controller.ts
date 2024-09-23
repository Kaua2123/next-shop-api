import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { Category, Sizes } from '@prisma/client';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async getProducts() {
    return this.productService.products();
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return this.productService.product({ id });
  }

  @Post('/create')
  async createProduct(
    @Body()
    productData: {
      name: string;
      description: string;
      price: number;
      stock: number;
      image_url: string;
      sizes: Sizes;
      category: Category;
    },
  ) {
    return this.productService.createProduct(productData);
  }

  @Put('/update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body()
    productData: {
      name: string;
      description: string;
      price: number;
      stock: number;
      image_url: string;
      sizes: Sizes;
      category: Category;
    },
  ) {
    return this.productService.updateProduct({ id }, productData);
  }

  @Patch('/toggleDisponibility/:id')
  async toggleDisponibility(
    @Param('id') id: string,
    @Body()
    productData: {
      isDisponible: boolean;
    },
  ) {
    return this.productService.disponibility({ id }, productData);
  }
}
