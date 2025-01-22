import {createError, defineEventHandler} from 'h3';
import {prisma} from '~/server/db';

export default defineEventHandler(async (event) => {
    const {itemId} = event.context.params;

    try {
        // Удаляем orderItem
        const deletedOrderItem = await prisma.orderItem.delete({
            where: {id: itemId},
        });

        // Проверяем количество оставшихся orderItem в order
        const orderItemsCount = await prisma.orderItem.count({
            where: {orderId: deletedOrderItem.orderId},
        });

        // Если больше нет orderItem, удаляем сам order
        if (orderItemsCount === 0) {
            await prisma.order.delete({
                where: {id: deletedOrderItem.orderId},
            });
        }

        return {
            message: 'Элемент заказа успешно удален',
        };
    } catch (error) {
        console.error('Ошибка при удалении элемента заказа', error);
        throw createError({statusCode: 500, statusMessage: 'Ошибка при удалении элемента заказа ' + error});
    }
});