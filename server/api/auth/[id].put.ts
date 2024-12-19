import {updateUser} from '~/server/db/users';
import {userTransformer} from '~/server/transformers/user';

export default defineEventHandler(async (event) => {
    try {
        const {id} = event.context.params;
        const {name, email, phone, password} = await readBody(event);

        if (!id) {
            throw new Error('Не передан ID пользователя');
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
        throw new Error('Ошибка обновления пользователя: ' + error.message);
    }
});