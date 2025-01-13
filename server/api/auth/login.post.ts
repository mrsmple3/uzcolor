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
            return {message: 'Missing required fields'};
        }

        // Is the user already registered?
        const user = await getUserByUsername(email);

        if (!user) {
            return {message: 'User not found'};
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return {message: 'Invalid password'};
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

        throw new Error('Error logging in: ' + error.message);
    }
});