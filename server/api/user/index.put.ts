import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const {id, ...data} = await readBody(event);

        const updatedUser = await prisma.user.update({
            where: {id: id},
            data: data,
        });

        return {
            status: 200,
            body: updatedUser,
        };
    } catch (error) {
        throw createError({statusCode: 500, statusMessage: error.message});
    }
});