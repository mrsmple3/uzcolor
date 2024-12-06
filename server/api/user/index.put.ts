import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {id, ...data} = await readBody(event);
        const updatedUser = await prisma.user.update({
            where: {id: Number(id)},
            data: data,
        });
        return {
            status: 200,
            body: updatedUser,
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Ошибка при обновлении пользователя'},
        };
    }
});