import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Ensure all required fields are provided
        if (!body.id || !body.name) {
            throw new Error('Missing required fields');
        }

        // Update the category
        const category = await prisma.category.update({
            where: {id: body.id},
            data: {name: body.name},
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