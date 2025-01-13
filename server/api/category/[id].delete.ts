import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {id} = event.context.params;

        // Ensure the id is provided
        if (!id) {
            return {message: 'Идентификатор категории обязателен'};
        }

        // Delete associated products
        await prisma.product.deleteMany({
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