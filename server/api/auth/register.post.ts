import {createUser} from "~/server/db/users";
import {userTransformer} from "~/server/transformers/user";

export default defineEventHandler(async (event) => {
    try {
        const {name, email, phone, password, role} = await readBody(event);

        if (!email && !phone) {
            throw new Error('Необходимо указать email или телефон');
        }

        let userData = {
            email,
            password,
            role,
        }

        console.log(userData);

        const user = await createUser(userData);

        return userTransformer(user);
    } catch (error) {
        throw new Error('Ошибка создания пользователя: ' + error.message);
    }
});