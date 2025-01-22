import {createError, defineEventHandler} from 'h3';
import {prisma} from '~/server/db';

export default defineEventHandler(async (event) => {
    const {itemId} = event.context.params;
    const body = await readBody(event);
    console.log(body)
    try {
        // Проверяем, существует ли элемент заказа
        const orderItem = await prisma.orderItem.findUnique({
            where: {id: itemId},
        });

        if (!orderItem) {
            throw createError({statusCode: 404, statusMessage: 'Элемент заказа не найден'});
        }

        // Обновляем статус элемента заказа
        const updatedOrderItem = await prisma.orderItem.update({
            where: {id: itemId},
            data: {
                status: body.status,
            },
        });

        return {
            message: 'Статус элемента заказа успешно обновлен',
            orderItem: updatedOrderItem,
        };
    } catch (error) {
        console.error('Ошибка при обновлении статуса элемента заказа:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при обновлении статуса элемента заказа ' + error.message
        });
    }
});