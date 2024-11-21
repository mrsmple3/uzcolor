import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Ensure all required fields are provided
        if (!body.name) {
            throw new Error('Missing required fields');
        }

        // Create the new category
        const category = await prisma.category.create({
            data: {
                name: body.name,
                photo: body.photo
            },
        });

        return category
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});