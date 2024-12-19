import {decodeAccessToken} from "~/server/utils/jwt";
import {getUserById} from "~/server/db/users";
import {userTransformer} from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
    const token = event.req.headers['authorization']?.split(' ')[1];
    if (!token) {
        throw new Error('Токен не найден');
    }
    const decoded = decodeAccessToken(token);

    if (!decoded) {
        throw new Error('Ошибка декодирования токена');
    }

    try {
        const userId = decoded.userId;

        const user = await getUserById(userId);

        return userTransformer(user);
    } catch (error) {
        throw new Error('Ошибка получения пользователя: ' + error.message);
    }
})