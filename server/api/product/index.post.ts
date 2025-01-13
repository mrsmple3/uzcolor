import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Ensure all required fields are provided
        if (!body.name || !body.categoryId) {
            return {message: "Missing required fields"};
        }

        // Check if the category exists
        const category = await prisma.category.findUnique({
            where: {id: body.categoryId},
        });

        if (!category) {
            return {message: "Category not found"};
        }

        // Create or find filters based on product parameters
        for (const param of body.params) {
            await prisma.filter.upsert({
                where: {
                    name: param.title,
                },
                update: {},
                create: {
                    name: param.title,
                },
            });
        }

        // Create the new DefineProduct
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
                params: body.params,
            },
        });
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});
