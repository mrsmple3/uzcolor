import {decodeAccessToken} from "~/server/utils/jwt";
import {getUserById} from "~/server/db/users";
import {userTransformer} from "~/server/transformers/user";
import {sendError} from "h3";

export default defineEventHandler(async (event) => {
    const token = event.req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return {
            message: 'Токен не найден',
        }
    }
    const decoded = decodeAccessToken(token);

    if (!decoded) {
        return {
            message: 'Ошибка декодирования токена',
        }
    }

    try {
        const userId = decoded.userId;

        const user = await getUserById(userId);

        return userTransformer(user);
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            message: 'Ошибка получения пользователя: ' + error.message
        }));
    }
})