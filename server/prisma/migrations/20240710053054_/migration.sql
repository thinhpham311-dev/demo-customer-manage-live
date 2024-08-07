/*
  Warnings:

  - You are about to drop the column `customerEmail` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `products` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerEmail",
DROP COLUMN "customerName",
DROP COLUMN "products";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "orderId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
