import {createUser} from "~/server/db/users";
import {userTransformer} from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
    try {
        const {name, email, phone, password} = await readBody(event);

        if (!email || !name || !phone || !password) {
            return sendError(event, createError({statusCode: 400, statusMessage: 'Не все поля заполнены'}));
        }

        const userData = {
            name,
            email,
            phone,
            password,
        }

        const user = await createUser(userData)

        return {
            body: userTransformer(user),
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Ошибка при создании пользователя ' + error},
        };
    }
});