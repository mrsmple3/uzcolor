import {decodeAccessToken} from "~/server/utils/jwt";
import {getUserById} from "~/server/db/users";
import {userTransformer} from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
    const token = event.req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return sendError(event, createError({statusCode: 401, statusMessage: 'Токен не ставлен'}));
    }
    const decoded = decodeAccessToken(token);

    if (!decoded) {
        return sendError(event, createError({statusCode: 401, statusMessage: 'Токен не найден'}));
    }

    try {
        const userId = decoded.userId;

        const user = await getUserById(userId);

        return userTransformer(user);
    } catch (error) {
        return sendError(event, createError({statusCode: 500, statusMessage: 'Внутренняя ошибка сервера ' + error}));
    }
})