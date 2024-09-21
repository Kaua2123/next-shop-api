import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

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
}
