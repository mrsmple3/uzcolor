import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {userId, productId} = event.context.params;

        if (!userId || !productId) {
            throw new Error('Идентификатор пользователя и продукта обязателен');
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
        throw new Error('Ошибка удаления продукта из избранного: ' + error.message);
    }
});