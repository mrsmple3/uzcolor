import {updateUser} from '~/server/db/users';
import {userTransformer} from '~/server/transformers/user';
import {sendError} from "h3";

export default defineEventHandler(async (event) => {
    try {
        const {id} = event.context.params;
        const {name, email, phone, password} = await readBody(event);

        if (!id) {
            return {
                message: 'Не передан ID пользователя',
            }
        }

        const updatedUserData = {
            name,
            email,
            phone,
            password,
        };

        const updatedUser = await updateUser(id, updatedUserData);

        return userTransformer(updatedUser);
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            message: 'Ошибка обновления пользователя: ' + error.message
        }));
    }
});