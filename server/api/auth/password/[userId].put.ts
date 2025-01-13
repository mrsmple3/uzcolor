import {getUserById, updateUserPassword} from "~/server/db/users";
import bcrypt from 'bcrypt';
import {createError, readBody, sendError} from 'h3';

export default defineEventHandler(async (event) => {
    const userId = event.context.params.userId;
    const {currentPassword, newPassword} = await readBody(event);

    if (!userId || !currentPassword || !newPassword) {
        return {message: 'User ID, current password, and new password are required'}
    }

    try {
        const user = await getUserById(userId);
        if (!user) {
            return {message: 'User not found'}
        }

        const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
        if (!isPasswordValid) {
            return {message: 'Current password is incorrect'}
        }

        await updateUserPassword(userId, newPassword);

        return {message: 'Password updated successfully'};
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Error updating password: ' + error.message
        }));
    }
});