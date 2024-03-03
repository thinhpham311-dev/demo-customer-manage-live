/*
  Warnings:

  - You are about to drop the column `product` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_customerId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "product",
ADD COLUMN     "products" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productId",
ADD COLUMN     "products" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "customerId";
