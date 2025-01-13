import {defineEventHandler, sendError} from 'h3';
import {prisma} from '~/server/db';
import jwt from 'jsonwebtoken';

const checkAdmin = defineEventHandler(async (event) => {
    const authHeader = event.req.headers['authorization'];
    if (!authHeader) {
        return sendError(event, new Error('Authorization header is missing'));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return sendError(event, new Error('Token is missing'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {id: decoded.id},
        });

        if (!user || user.role !== 'admin') {
            return sendError(event, new Error('Access denied'));
        }

        event.context.user = user;
    } catch (error) {
        return sendError(event, new Error('Invalid token'));
    }
});

export default checkAdmin;