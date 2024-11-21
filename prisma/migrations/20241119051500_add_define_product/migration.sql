-- CreateTable
CREATE TABLE "define_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "art" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "photo" TEXT,
    "price" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "composition" TEXT NOT NULL,
    "params" JSONB NOT NULL DEFAULT '{}',
    "color" JSONB NOT NULL DEFAULT '{}',
    "des" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "define_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "define_products" ADD CONSTRAINT "define_products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
