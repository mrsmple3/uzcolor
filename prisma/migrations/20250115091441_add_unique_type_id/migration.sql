/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `filter_products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "filter_products_id_key" ON "filter_products"("id");
