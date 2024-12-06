import {updateUser} from '~/server/db/users';
import {userTransformer} from '~/server/transformers/user';

export default defineEventHandler(async (event) => {
    try {
        const {id} = event.context.params;
        const {name, email, phone, password} = await readBody(event);

        if (!id) {
            return sendError(event, createError({statusCode: 400, statusMessage: 'ID пользователя не указан'}));
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
        return {
            status: 500,
            body: {error: 'Ошибка при обновлении пользователя: ' + error},
        };
    }
});