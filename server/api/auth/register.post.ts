import {createUser} from "~/server/db/users";
import {userTransformer} from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
    try {
        const {name, email, phone, password} = await readBody(event);

        if (!email && !phone) {
            throw new Error('Необходимо указать email или телефон');
        }

        const userData = {
            name,
            email,
            phone,
            password,
        }

        const user = await createUser(userData);

        return userTransformer(user);
    } catch (error) {
        throw new Error('Ошибка создания пользователя: ' + error.message);
    }
});