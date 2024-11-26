import {getCookie} from 'h3';
import {getRefreshTokenByToken} from "~/server/db/refreshTokens";
import {decodeRefreshToken, generateTokens} from "~/server/utils/jwt";
import {getUserById} from "~/server/db/users";

export default defineEventHandler(async (event) => {

    try {
        const refreshToken = getCookie(event, 'refreshToken');

        if (!refreshToken) {
            return sendError(event, createError({statusCode: 401, statusMessage: 'Токен не найден'}));
        }

        const rToken = await getRefreshTokenByToken(refreshToken);

        const token = decodeRefreshToken(refreshToken);

        try {
            const user = await getUserById(token.userId);
            const {accessToken} = generateTokens(user);
            return {accessToken: accessToken};
        } catch (error) {
            return sendError(event, createError({
                statusCode: 500,
                statusMessage: 'Внутренняя ошибка сервера ' + error
            }));
        }
    } catch (error) {
        return sendError(event, createError({statusCode: 500, statusMessage: 'Внутренняя ошибка сервера ' + error}));
    }
})