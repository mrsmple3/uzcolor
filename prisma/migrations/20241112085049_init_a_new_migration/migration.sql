-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "art" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "photo" TEXT,
    "type" TEXT NOT NULL,
    "params" JSONB NOT NULL DEFAULT '{}',
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "show" BOOLEAN NOT NULL DEFAULT true,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "filters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filters" ADD CONSTRAINT "filters_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
