-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "color" JSONB NOT NULL DEFAULT '{}';

-- CreateIndex
CREATE INDEX "order_items_orderId_idx" ON "order_items"("orderId");

-- CreateIndex
CREATE INDEX "order_items_productId_idx" ON "order_items"("productId");

-- CreateIndex
CREATE INDEX "orders_userId_idx" ON "orders"("userId");
