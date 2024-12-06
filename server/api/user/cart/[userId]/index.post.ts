import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {userId} = event.context.params;
        const {productId, count, color, price} = await readBody(event);

        if (!userId || !productId || !count || !price || !color) {
            throw new sendError(event, createError({statusCode: 400, statusMessage: 'Не все поля заполнены'}));
        }

        // Ensure the user exists
        const user = await prisma.user.findUnique({
            where: {id: userId}
        });

        if (!user) {
            throw new sendError(event, createError({statusCode: 404, statusMessage: 'User not found'}));
        }

        // Add product to cart
        const cartItem = await prisma.cartItem.create({
            data: {
                cart: {
                    connectOrCreate: {
                        where: {userId},
                        create: {userId}
                    }
                },
                product: {
                    connect: {id: productId}
                },
                count,
                color,
                price
            }
        });

        return cartItem;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Ошибка при добавлении товара в корзину: ' + error.message
        }));
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});