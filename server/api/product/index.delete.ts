import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {id} = await readBody(event);

        // Ensure the id is provided
        if (!id) {
            throw new Error('Missing required field: id');
        }

        // Delete the product
        const product = await prisma.defineProduct.delete({
            where: {id: id},
        });

        return {
            message: 'Product deleted successfully',
            product
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});