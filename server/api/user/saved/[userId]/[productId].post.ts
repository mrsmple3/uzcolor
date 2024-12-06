import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {userId, productId} = event.context.params;

        if (!userId || !productId) {
            return sendError(event, createError({statusCode: 400, statusMessage: 'Не все поля заполнены'}));
        }

        return await prisma.favorite.create({
            data: {
                userId,
                productId,
            },
        });
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Ошибка при добавлении в избранное: ' + error.message},
        };
    }
});