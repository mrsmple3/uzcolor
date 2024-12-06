/*
  Warnings:

  - You are about to drop the column `photo` on the `define_products` table. All the data in the column will be lost.
  - Added the required column `price` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "price" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "define_products" DROP COLUMN "photo";
