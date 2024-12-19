import {getUserByUsername} from "~/server/db/users";
import bcrypt from "bcrypt";
import {generateTokens, sendRefreshToken} from "~/server/utils/jwt";
import {userTransformer} from "~/server/transformers/user";
import {createRefreshToken} from "~/server/db/refreshTokens";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const {email, password} = body;

        if (!email || !password) {
            throw new Error('Not all fields are filled');
        }

        // Is the user already registered?
        const user = await getUserByUsername(email);

        if (!user) {
            throw new Error('User not found');
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new Error('Password is incorrect');
        }

        // Generate Tokens
        const {accessToken, refreshToken} = generateTokens(user);

        // Save it inside the database
        await createRefreshToken({
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