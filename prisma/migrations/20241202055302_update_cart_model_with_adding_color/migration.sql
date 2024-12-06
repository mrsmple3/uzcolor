/*
  Warnings:

  - Added the required column `color` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart_items" ADD COLUMN     "color" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "define_products" ALTER COLUMN "count" SET DEFAULT 10;
