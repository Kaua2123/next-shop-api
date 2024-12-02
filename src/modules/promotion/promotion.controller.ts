import { Controller, Get, Param, Post } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { CreatePromotionDto } from './dto/create-promotion-dto';

@Controller('/promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get('/')
  async getPromotions() {
    return await this.promotionService.promotions();
  }

  @Get('/:id')
  async findPromotionById(@Param('id') id: string) {
    return await this.promotionService.promotion({ id });
  }

  @Post('/createPromotion')
  async createPromotion(
    @Param('productId') productId: string,
    createPromotionDto: CreatePromotionDto,
  ) {
    return await this.promotionService.createPromotion(
      productId,
      createPromotionDto,
    );
  }
}
