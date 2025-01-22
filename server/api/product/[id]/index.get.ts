import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    const {id} = event.context.params;

    try {
        const product = await prisma.defineProduct.findUnique({
            where: {id: String(id)},
            select: {
                id: true,
                name: true,
                art: true,
                weight: true,
                count: true,
                price: true,
                type: true,
                composition: true,
                params: {
                    select: {
                        name: true,
                        filter: {
                            select: {
                                id: true,
                                name: true,
                                show: true
                            },
                        },
                    },
                },
                color: true,
                categoryId: true,
                show: true,
                shortDescription: true,
                description: true,
            }
        });

        if (!product) {
            return {message: 'Product not found'};
        }

        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});