/*
  Warnings:

  - The primary key for the `filter_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `filter_products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "filter_products" DROP CONSTRAINT "filter_products_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "filter_products_pkey" PRIMARY KEY ("filterId", "defineProductId");
