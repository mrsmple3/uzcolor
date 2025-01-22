import {createError, defineEventHandler} from 'h3';
import {prisma} from '~/server/db';

export default defineEventHandler(async (event) => {
    const {userId} = event.context.params;

    try {
        // Проверяем, существует ли корзина для данного userId
        const cart = await prisma.cart.findUnique({
            where: {userId},
            include: {items: true},
        });

        if (!cart) {
            throw createError({statusCode: 404, statusMessage: 'Корзина не найдена'});
        }

        // Удаляем все связанные элементы корзины
        await prisma.cartItem.deleteMany({
            where: {cartId: cart.id},
        });

        // Удаляем саму корзину
        await prisma.cart.delete({
            where: {id: cart.id},
        });

        return {
            message: 'Корзина и все связанные элементы корзины успешно удалены',
        };
    } catch (error) {
        console.error('Ошибка при удалении корзины:', error);
        throw createError({statusCode: 500, statusMessage: 'Ошибка при удалении корзины ' + error.message});
    }
});