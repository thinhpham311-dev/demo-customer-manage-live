/*
  Warnings:

  - You are about to drop the column `orderId` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_orderId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
