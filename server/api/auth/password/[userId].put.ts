import {getUserById, updateUserPassword} from "~/server/db/users";
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
    const userId = event.context.params.userId;
    const {currentPassword, newPassword} = await readBody(event);

    if (!userId || !currentPassword || !newPassword) {
        console.log('User ID, current password, and new password are required');
        throw createError({
            statusCode: 400,
            statusMessage: 'User ID, current password, and new password are required',
        });
    }

    try {
        const user = await getUserById(userId);
        if (!user) {
            console.log('User not found');
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found',
            });
        }

        const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
        if (!isPasswordValid) {
            console.log('Current password is incorrect');
            throw createError({
                statusCode: 401,
                statusMessage: 'Current password is incorrect',
            });
        }
        console.log(isPasswordValid, 'isPasswordValid');
        await updateUserPassword(userId, newPassword);

        return {message: 'Password updated successfully'};
    } catch (error) {
        console.log('Error updating password:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Error updating password',
        });
    }
});