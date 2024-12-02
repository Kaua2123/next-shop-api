/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `promotions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `promotions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "promotions" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "promotions_name_key" ON "promotions"("name");
