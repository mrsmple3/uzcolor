import {getUserByUsername} from "~/server/db/users";
import bcrypt from "bcrypt";
import {generateTokens, sendRefreshToken} from "~/server/utils/jwt";
import {userTransformer} from "~/server/transformers/user";
import {createOrUpdateRefreshToken} from "~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const {email, password} = body;

        if (!email || !password) {
            throw new Error('Missing required fields');
        }

        // Is the user already registered?
        const user = await getUserByUsername(email);

        if (!user) {
            throw new Error('User not found');
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new Error('Invalid password');
        }

        // Generate Tokens
        const {accessToken, refreshToken} = generateTokens(user);

        // Save it inside the database
        await createOrUpdateRefreshToken({
            token: refreshToken,
            userId: user.id
        });

        sendRefreshToken(event, refreshToken);

        return {
            access_token: accessToken,
            user: userTransformer(user)
        }
    } catch (error) {
        console.log('Error logging in', error);
        throw createError({statusCode: 500, statusMessage: error.message});
    }
});