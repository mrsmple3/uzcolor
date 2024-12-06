import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {userId} = event.context.params;

        if (!userId) {
            return sendError(event, createError({statusCode: 400, statusMessage: 'Не все поля заполнены'}));
        }
        const response = await prisma.favorite.findMany({
            where: {userId: userId},
            include: {product: true},
        });


        return response;
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Ошибка при получении сохраненных товаров: ' + error.message},
        };
    }
});