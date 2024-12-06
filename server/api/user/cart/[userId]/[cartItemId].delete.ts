import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    const {userId, cartItemId} = event.context.params;

    try {
        // Находим корзину пользователя
        const cart = await prisma.cart.findUnique({
            where: {userId: userId},
            include: {items: true},
        });

        if (!cart) {
            return {
                status: 404,
                body: {error: 'Корзина не найдена'},
            };
        }
        
        // Обновляем ко��зину
        await prisma.cartItem.delete({
            where: {id: cartItemId},
        });

        return {
            status: 200,
            body: {message: 'Элемент корзины удален'},
        };
    } catch (error) {
        console.error('Ошибка при удалении элемента корзины:', error);
        return {
            status: 500,
            body: {error: 'Ошибка сервера'},
        };
    }
});