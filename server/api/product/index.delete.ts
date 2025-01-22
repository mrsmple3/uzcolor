import {prisma} from "~/server/db";
import checkAdmin from "~/server/utils/check";

export default defineEventHandler(async (event) => {
    try {
        await checkAdmin(event);
        
        const {id} = await readBody(event);

        // Ensure the id is provided
        if (!id) {
            return {
                message: 'Missing required field: id'
            }
        }

        // Delete related favorites
        await prisma.favorite.deleteMany({
            where: {productId: id},
        });

        await prisma.cartItem.deleteMany({
            where: {productId: id},
        });

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