import {getUserById, updateUserPassword} from "~/server/db/users";
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
    const userId = event.context.params.userId;
    const {currentPassword, newPassword} = await readBody(event);

    if (!userId || !currentPassword || !newPassword) {
        throw new Error('User ID, current password, and new password are required');
    }

    try {
        const user = await getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new Error('Current password is incorrect');
        }

        await updateUserPassword(userId, newPassword);

        return {message: 'Password updated successfully'};
    } catch (error) {
        throw new Error('Error updating password: ' + error.message);
    }
});