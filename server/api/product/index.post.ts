import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Ensure all required fields are provided
        if (!body.name || !body.art || !body.weight || !body.color || !body.type || !body.categoryId) {
            throw new Error('Missing required fields');
        }

        // Check if the category exists
        const category = await prisma.category.findUnique({
            where: {id: body.categoryId}
        });

        if (!category) {
            throw new Error('Category not found');
        }

        // Create or find filters based on product parameters
        for (const param of body.params) {
            await prisma.filter.upsert({
                where: {
                    name: param.title
                },
                update: {},
                create: {
                    name: param.title,
                }
            });
        }

        // Create the new DefineProduct
        const defineProduct = await prisma.defineProduct.create({
            data: {
                name: body.name,
                art: body.art,
                weight: body.weight,
                color: body.color,
                photo: body.photo,
                price: body.price,
                type: body.type,
                composition: body.composition,
                des: body.des,
                description: body.description,
                count: body.count,
                categoryId: body.categoryId,
                params: body.params,
            },
        });

        return defineProduct;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});