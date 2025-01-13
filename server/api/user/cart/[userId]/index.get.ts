import {prisma} from "~/server/db";
import {createError, sendError} from "h3";

export default defineEventHandler(async (event) => {
    try {
        const {userId} = event.context.params;

        if (!userId) {
            return {message: 'Идентификатор пользователя обязателен'};
        }

        // Получаем корзину пользователя
        const cart = await prisma.cart.findUnique({
            where: {userId},
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!cart) {
            return {message: 'Корзина не найдена'};
        }

        return cart;
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Ошибка получения корзины: ' + error.message
        }));
    } finally {
        await prisma.$disconnect();
    }
});