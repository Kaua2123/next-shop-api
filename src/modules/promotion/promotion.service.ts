import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PromotionsNotFound } from './errors/promotions-not-found';
import { Prisma } from '@prisma/client';

@Injectable()
export class PromotionService {
  constructor(private readonly prisma: PrismaService) {}

  async promotions() {
    const promotions = await this.prisma.promotion.findMany();

    if (!promotions) throw new PromotionsNotFound();

    return promotions;
  }

  async promotion(promotionWhereUniqueInput: Prisma.PromotionWhereUniqueInput) {
    const promotion = await this.prisma.promotion.findFirst({
      where: promotionWhereUniqueInput,
    });

    if (!promotion) throw new PromotionsNotFound();

    return promotion;
  }

  // rota de adm
  async createPromotion(data: Prisma.PromotionCreateInput) {
    return await this.prisma.promotion.create({
      data,
    });
  }
}
