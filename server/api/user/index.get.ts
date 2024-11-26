import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const users = await prisma.user.findMany();
        return {
            status: 200,
            body: users,
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Ошибка при получении пользоват��лей'},
        };
    }
});