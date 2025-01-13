import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Ensure all required fields are provided
        if (!body.id) {
            return {message: 'Missing required fields',}
        }

        // Update the category
        const category = await prisma.category.update({
            where: {id: body.id},
            data: {
                name: body.name,
                photo: body.photo
            },
        });

        return {
            message: 'Category updated successfully',
            category: category
        }
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});