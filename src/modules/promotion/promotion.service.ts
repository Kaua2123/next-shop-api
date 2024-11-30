import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PromotionService {
  constructor(private readonly prisma: PrismaService) {}

  async promotions() {
    const promotions = await this.prisma.promotion.findMany();

    return promotions;
  }
}
