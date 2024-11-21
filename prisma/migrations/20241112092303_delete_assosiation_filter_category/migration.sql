/*
  Warnings:

  - You are about to drop the column `category_id` on the `filters` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "filters" DROP CONSTRAINT "filters_category_id_fkey";

-- AlterTable
ALTER TABLE "filters" DROP COLUMN "category_id";
