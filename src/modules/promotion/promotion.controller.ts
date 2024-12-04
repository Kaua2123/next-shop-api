import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PromotionService } from './promotion.service';

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
    @Body()
    promotionData: {
      name: string;
      discount: number;
      start_date: string;
      end_date: string;
    },
  ) {
    return await this.promotionService.createPromotion(promotionData);
  }
}
