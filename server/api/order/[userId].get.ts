import {createError, defineEventHandler} from 'h3';
import {prisma} from '~/server/db';

export default defineEventHandler(async (event) => {
    const {userId} = event.context.params;

    try {
        const orders = await prisma.order.findMany({
            where: {userId},
            include: {
                items: true,
            },
        });

        return orders;
    } catch (error) {
        console.error('Ошибка при получении заказов:', error);
        throw createError({statusCode: 500, statusMessage: 'Ошибка при получении заказов ' + error});
    }
});