import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Ensure all required fields are provided
        if (!body.id || !body.name || !body.composition || !body.art || !body.weight || !body.color || !body.type || !body.categoryId) {
            throw new Error('Missing required fields');
        }

        // Check if the category exists
        const category = await prisma.category.findUnique({
            where: {id: body.categoryId}
        });

        if (!category) {
            throw new Error('Category not found');
        }

        // Update the product
        const product = await prisma.defineProduct.update({
            select: {
                id: true,
                name: true,
                art: true,
                weight: true,
                type: true,
                composition: true,
                color: true,
                params: true,
                categoryId: true,
            },
            where: {id: body.id},
            data: {
                name: body.name,
                composition: body.composition,
                art: body.art,
                weight: body.weight,
                color: body.color,
                type: body.type,
                categoryId: body.categoryId,
            },
        });

        return {
            message: 'Product updated successfully',
            product
        }
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});