// get users
import {defineEventHandler} from 'h3';
import {prisma} from '~/server/db';
import checkAdmin from "~/server/utils/check";

export default defineEventHandler(async (event) => {
    try {
        await checkAdmin(event);

        const users = await prisma.user.findMany({
            where: {
                role: {
                    not: 'ADMIN',
                },
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                company: true,
                address: true,
                files: true,
                updatedAt: true,
            },
        });

        return users;
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        throw createError({statusCode: 500, statusMessage: 'Ошибка при получении пользователей ' + error});
    }
});