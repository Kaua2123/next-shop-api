import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PromotionsNotFound } from './errors/promotions-not-found';
import { Prisma } from '@prisma/client';
import { CreatePromotionDto } from './dto/create-promotion-dto';

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
  async createPromotion(
    productId: string,
    createPromotionDto: CreatePromotionDto,
  ) {
    const { name, discount, start_date, end_date } = createPromotionDto;

    return await this.prisma.promotion.create({
      data: {
        name,
        discount,
        start_date,
        end_date,
        product: {
          connect: { id: productId },
        },
      },
    });
  }
}
