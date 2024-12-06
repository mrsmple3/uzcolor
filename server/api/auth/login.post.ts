import {getUserByUsername} from "~/server/db/users";
import bcrypt from "bcrypt";
import {generateTokens, sendRefreshToken} from "~/server/utils/jwt";
import {userTransformer} from "~/server/transformers/user";
import {createRefreshToken} from "~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const {email, password} = body;

        if (!email || !password) {
            console.log('Password is incorrect');
            return sendError(event, createError({statusCode: 400, statusMessage: 'Не все поля заполнены'}));
        }

        // Is the user already registered?
        const user = await getUserByUsername(email);

        if (!user) {
            console.log('User not found');
            return sendError(event, createError({statusCode: 400, statusMessage: 'Пользователь не найден'}));
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            console.log('Password is incorrect');
            return sendError(event, createError({statusCode: 400, statusMessage: 'Неверный пароль или email'}));
        }

        // Generate Tokens
        const {accessToken, refreshToken} = generateTokens(user);

        // Save it inside the database
        await createRefreshToken({
            token: refreshToken,
            userId: user.id
        });

        sendRefreshToken(event, refreshToken);

        return {
            access_token: accessToken,
            user: userTransformer(user)
        }
    } catch (error) {
        console.log(error);
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Внутренняя ошибка сервера: ' + error.message
        }));
    }
});