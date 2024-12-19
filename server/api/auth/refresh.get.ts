import {getCookie} from 'h3';
import {getRefreshTokenByToken} from "~/server/db/refreshTokens";
import {generateTokens} from "~/server/utils/jwt";
import {getUserById} from "~/server/db/users";

export default defineEventHandler(async (event) => {

    try {
        const refreshToken = getCookie(event, 'refreshToken');

        if (!refreshToken) {
            throw new Error('Токен не найден');
        }


        const rToken = await getRefreshTokenByToken(refreshToken);
        if (!rToken) {
            throw new Error('Токен не найден');
        }


        try {
            const user = await getUserById(rToken.userId);
            const {accessToken} = generateTokens(user);
            return {accessToken: accessToken};
        } catch (error) {
            throw new Error('Токен не найден');
        }
    } catch (error) {
        throw new Error('Ошибка обновления токена: ' + error.message);
    }
})