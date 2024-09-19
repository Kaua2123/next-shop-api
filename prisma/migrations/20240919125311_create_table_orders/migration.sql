-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDENTE', 'PREPARANDO', 'ENVIADO', 'ENTREGUE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDENTE', 'PAGO', 'FALHO');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_userId_key" ON "orders"("userId");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
