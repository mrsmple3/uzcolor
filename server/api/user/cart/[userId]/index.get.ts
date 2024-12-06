import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {userId} = event.context.params;

        if (!userId) {
            throw new sendError(event, createError({statusCode: 400, statusMessage: 'Не указан userId'}));
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
            throw new sendError(event, createError({statusCode: 404, statusMessage: 'Корзина не найдена'}));
        }

        return cart;
    } catch (error) {
        console.error('Error fetching cart:', error);
        sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Ошибка при получении корзины: ' + error.message
        }));
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});