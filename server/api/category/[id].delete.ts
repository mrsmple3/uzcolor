import {prisma} from "~/server/db";
import checkAdmin from "~/server/utils/check";

export default defineEventHandler(async (event) => {
    try {
        await checkAdmin(event);
        const {id} = event.context.params;

        // Ensure the id is provided
        if (!id) {
            return {message: 'Идентификатор категории обязателен'};
        }

        // Delete associated order items
        await prisma.orderItem.deleteMany({
            where: {product: {categoryId: id}},
        });

        // Delete associated products
        await prisma.defineProduct.deleteMany({
            where: {categoryId: id},
        });

        // Delete the category
        const category = await prisma.category.delete({
            where: {id: id},
        });

        return {
            message: 'Category deleted successfully',
            category
        };
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});