// server/api/product/index.post.ts
import {prisma} from "~/server/db";
import checkAdmin from "~/server/utils/check";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        await checkAdmin(event);

        if (!body.name || !body.categoryId) {
            return {message: "Missing required fields"};
        }

        const category = await prisma.category.findUnique({
            where: {id: body.categoryId},
        });

        if (!category) {
            return {message: "Category not found"};
        }

        const filterProducts = [];
        for (const param of body.params) {
            const filter = await prisma.filter.upsert({
                where: {name: param.filter.name},
                update: {},
                create: {name: param.filter.name},
            });

            const filterProduct = await prisma.filterProduct.create({
                data: {
                    name: param.name,
                    filterId: filter.id,
                    defineProductId: body.id,
                },
            });

            filterProducts.push({id: filterProduct.id});
        }

        return await prisma.defineProduct.create({
            data: {
                name: body.name,
                art: body.art,
                weight: body.weight,
                color: body.color,
                price: body.price,
                type: body.type,
                composition: body.composition,
                shortDescription: body.shortDescription,
                description: body.description,
                categoryId: body.categoryId,
                params: {connect: filterProducts},
            },
        });
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});