/*
  Warnings:

  - You are about to drop the column `status` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Заказ в обработке',
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Самовывоз со склада';

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "status";
