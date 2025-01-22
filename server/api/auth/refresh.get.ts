import {getCookie} from 'h3';
import {getRefreshTokenByToken} from "~/server/db/refreshTokens";
import {generateTokens} from "~/server/utils/jwt";
import {getUserById} from "~/server/db/users";

export default defineEventHandler(async (event) => {
    try {
        const refreshToken = getCookie(event, 'refreshToken');

        if (!refreshToken) {
            return 'Missing required fields';
        }

        const rToken = await getRefreshTokenByToken(refreshToken);
        if (!rToken) {
            return 'Токен не найден';
        }

        try {
            const user = await getUserById(rToken.userId);
            const {accessToken} = generateTokens(user);
            return {accessToken: accessToken};
        } catch (error) {
            return {message: 'Токен не найден'};
        }
    } catch (error) {
        return createError({
            statusCode: 500,
            message: 'Ошибка обновления токена: ' + error.message
        });
    }
});