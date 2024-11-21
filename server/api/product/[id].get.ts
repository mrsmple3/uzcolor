import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const {id} = event.context.params;

    try {
        const product = await prisma.defineProduct.findUnique({
            where: {id: String(id)},
        });

        if (!product) {
            throw new Error('Product not found');
        }

        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});