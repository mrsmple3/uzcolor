import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const {id} = await readBody(event);
        const deletedUser = await prisma.user.delete({
            where: {id: id},
        });
        return {
            status: 200,
            body: deletedUser,
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Ошибка при удалении пользователя'},
        };
    }
});