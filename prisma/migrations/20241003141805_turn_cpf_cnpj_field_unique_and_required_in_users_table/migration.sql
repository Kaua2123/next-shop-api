/*
  Warnings:

  - A unique constraint covering the columns `[cpfCnpj]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `cpfCnpj` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cpfCnpj" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_cpfCnpj_key" ON "users"("cpfCnpj");
