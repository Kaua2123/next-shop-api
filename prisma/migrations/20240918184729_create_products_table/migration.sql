-- CreateEnum
CREATE TYPE "Sizes" AS ENUM ('P', 'M', 'G', 'GG');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ELETRONICOS', 'ESTILO', 'LIVROS', 'FERRAMENTAS', 'JOGOS');

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "sizes" "Sizes" NOT NULL,
    "category" "Category" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
