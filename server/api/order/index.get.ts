import {defineEventHandler} from 'h3';
import {prisma} from '~/server/db';

export default defineEventHandler(async (event) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true,
                    }
                },
                user: true,
            },
        });
        return orders;
    } catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Ошибка при получении заказов ' + error.message});
    }
});