import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [],
  controllers: [PromotionController],
  providers: [PrismaService, PromotionService],
})
export class PromotionModule {}
