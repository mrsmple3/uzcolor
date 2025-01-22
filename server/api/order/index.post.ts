import {defineEventHandler, readBody} from 'h3';
import {prisma} from '~/server/db';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const {userId, items, totalAmount, totalPrice, type} = body;

    try {
        const order = await prisma.order.create({
            data: {
                userId,
                totalAmount,
                totalPrice,
                items: {
                    create: items.map((item) => ({
                        productId: item.productId,
                        quantity: item.product.count,
                        price: item.product.price,
                        color: item.color,
                        type: type,
                    })),
                },
            },
        });

        return order;
    } catch (error) {
        console.log('Ошибка при создании заказа', error);
        throw createError({statusCode: 500, statusMessage: 'Ошибка при создании заказа ' + error});
    }
});