import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {userId, productId} = event.context.params;

        if (!userId || !productId) {
            throw new Error('Идентификатор пользователя и продукта обязателен');
        }

        return await prisma.favorite.create({
            data: {
                userId,
                productId,
            },
        });
    } catch (error) {
        throw new Error('Ошибка добавления продукта в избранное: ' + error.message);
    }
});