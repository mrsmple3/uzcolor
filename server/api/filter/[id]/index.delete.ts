import {prisma} from '~/server/db';
import {createError, sendError} from 'h3';

export default defineEventHandler(async (event) => {
    try {
        const {id} = event.context.params;

        // Ensure the id is provided
        if (!id) {
            return sendError(event, createError({statusCode: 400, statusMessage: 'ID фильтра обязателен'}));
        }

        // Find the filter by ID
        const filter = await prisma.filter.findUnique({
            where: {id: id},
        });

        if (!filter) {
            return sendError(event, createError({statusCode: 404, statusMessage: 'Фильтр не найден'}));
        }

        const products = await prisma.defineProduct.findMany({
            where: {
                params: {
                    some: {
                        title: filter.name,
                    }
                },
            },
        });


        console.log("Product", products);

        for (const product of products) {
            const updatedParams = product.params.filter((param: any) => param.title !== filter.name);

            console.log("updatedParams", updatedParams);

            await prisma.defineProduct.update({
                where: {id: product.id},
                data: {params: updatedParams},
            });
        }

        // Delete the filter
        await prisma.filter.delete({
            where: {id: id},
        });

        return {
            message: 'Фильтр успешно удален',
        };
    } catch (error) {
        console.error('Ошибка при удалении фильтра:', error);
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Ошибка при удалении фильтра: ' + error.message,
        }));
    } finally {
        await prisma.$disconnect();
    }
});