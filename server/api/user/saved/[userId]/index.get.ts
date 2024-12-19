import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {userId} = event.context.params;

        if (!userId) {
            throw new Error('Идентификатор пользователя обязателен');
        }
        const response = await prisma.favorite.findMany({
            where: {userId: userId},
            include: {product: true},
        });


        return response;
    } catch (error) {
        throw new Error('Ошибка получения избранного: ' + error.message);
    }
});