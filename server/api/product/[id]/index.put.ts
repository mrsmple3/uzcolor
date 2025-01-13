import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const productId = event.context.params.id;
        const body = await readBody(event);

        // Ensure the count field is provided
        if (body.count === undefined) {
            return {message: 'Missing required field: count'};
        }

        // Check if the product exists
        const product = await prisma.defineProduct.findUnique({
            where: {id: productId}
        });

        if (!product) {
            throw new Error('Product not found');
        }

        // Update the product count
        const updatedProduct = await prisma.defineProduct.update({
            where: {id: productId},
            data: {count: body.count},
        });

        return {
            message: 'Product count updated successfully',
            product: updatedProduct
        }
    } catch (error) {
        console.error('Error updating product count:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});