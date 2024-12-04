/*
  Warnings:

  - You are about to drop the column `productId` on the `promotions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "promotions" DROP CONSTRAINT "promotions_productId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "promotionId" TEXT;

-- AlterTable
ALTER TABLE "promotions" DROP COLUMN "productId";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
