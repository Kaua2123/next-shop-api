import { Controller, Get } from '@nestjs/common';
import { PromotionService } from './promotion.service';

@Controller('/promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get('/')
  async getPromotions() {
    return await this.promotionService.promotions();
  }
}
