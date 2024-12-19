import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {userId} = event.context.params;

        if (!userId) {
            throw new Error('Идентификатор пользователя обязателен');
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
            throw new Error('Корзина не найдена');
        }

        return cart;
    } catch (error) {
        throw new Error('Ошибка получения корзины: ' + error.message);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});