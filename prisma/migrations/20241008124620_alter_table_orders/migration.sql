-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "isInstallment" DROP NOT NULL,
ALTER COLUMN "installmentCount" DROP NOT NULL,
ALTER COLUMN "installmentCount" DROP DEFAULT;
