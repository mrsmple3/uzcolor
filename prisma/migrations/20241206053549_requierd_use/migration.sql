/*
  Warnings:

  - You are about to drop the column `quantity` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `des` on the `define_products` table. All the data in the column will be lost.
  - Added the required column `count` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `cart_items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `short_description` to the `define_products` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `define_products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "cart_items" DROP COLUMN "quantity",
ADD COLUMN     "count" INTEGER NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "define_products" DROP COLUMN "des",
ADD COLUMN     "short_description" TEXT NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;
