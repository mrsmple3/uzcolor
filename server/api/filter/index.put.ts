import {prisma} from '~/server/db';
import {createError, readBody, sendError} from 'h3';
import checkAdmin from "~/server/utils/check";

export default defineEventHandler(async (event) => {
    try {
        await checkAdmin(event);
        const body = await readBody(event);

        // Ensure all required fields are provided
        if (!body.id || !body.name) {
            return sendError(event, createError({statusCode: 400, statusMessage: 'ID и имя фильтра обязательны'}));
        }

        // Find the filter by ID
        const filter = await prisma.filter.findUnique({
            where: {id: body.id},
        });

        if (!filter) {
            return sendError(event, createError({statusCode: 404, statusMessage: 'Фильтр не найден'}));
        }

        // Update the filter
        const updatedFilter = await prisma.filter.update({
            where: {id: body.id},
            data: {
                name: body.name,
                show: body.show !== undefined ? body.show : filter.show,
            },
        });

        return {
            message: 'Фильтр успешно обновлен',
            filter: updatedFilter,
        };
    } catch (error) {
        console.error('Ошибка при обновлении фильтра:', error);
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Ошибка при обновлении фильтра: ' + error.message
        }));
    } finally {
        await prisma.$disconnect();
    }
});