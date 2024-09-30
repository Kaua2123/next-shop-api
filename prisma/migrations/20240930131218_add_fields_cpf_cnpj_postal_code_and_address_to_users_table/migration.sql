-- DropIndex
DROP INDEX "cart_items_cartId_key";

-- DropIndex
DROP INDEX "cart_items_productId_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "addressNumber" TEXT,
ADD COLUMN     "cpfCnpj" TEXT,
ADD COLUMN     "postalCode" TEXT;
