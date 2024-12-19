import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {userId} = event.context.params;
        const {productId, count, color, price} = await readBody(event);

        if (!userId || !productId || !count || !price || !color) {
            throw new Error('User ID, product ID, count, color, and price are required');
        }

        // Ensure the user exists
        const user = await prisma.user.findUnique({
            where: {id: userId}
        });

        if (!user) {
            throw new Error('User not found');
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
        throw new Error('Error adding product to cart: ' + error.message);
    } finally {
        await prisma.$disconnect();
    }
});