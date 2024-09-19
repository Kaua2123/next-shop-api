-- CreateTable
CREATE TABLE "promotions" (
    "id" TEXT NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "promotions_productId_key" ON "promotions"("productId");

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
