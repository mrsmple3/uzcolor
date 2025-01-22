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