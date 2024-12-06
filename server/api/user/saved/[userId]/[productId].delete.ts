import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {userId, productId} = event.context.params;

        if (!userId || !productId) {
            return sendError(event, createError({statusCode: 400, statusMessage: 'Не все поля заполнены'}));
        }

        await prisma.favorite.deleteMany({
            where: {
                userId,
                productId,
            },
        });

        return {
            status: 200,
            body: {message: 'Продукт успешно удален из избранного'},
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Ошибка при удалении из избранного: ' + error.message},
        };
    }
});