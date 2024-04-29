-- CreateEnum
CREATE TYPE "Cover" AS ENUM ('HARDCOVER', 'PAPERBACK');

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metadata" (
    "id" TEXT NOT NULL,
    "pages" INTEGER NOT NULL DEFAULT 1,
    "publisher" TEXT NOT NULL,
    "language" TEXT,
    "cover" "Cover" NOT NULL DEFAULT 'PAPERBACK',
    "year" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isbn" TEXT,
    "productId" TEXT NOT NULL,

    CONSTRAINT "metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "metadata_productId_key" ON "metadata"("productId");

-- AddForeignKey
ALTER TABLE "metadata" ADD CONSTRAINT "metadata_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
