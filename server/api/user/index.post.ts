import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.email || !body.name || !body.phone || !body.password) {
            return {
                status: 400,
                body: {error: 'Не все поля заполнены'},
            };
        }

        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                phone: body.phone,
                password: body.password,
            },
        });

        return {
            status: 201,
            body: newUser,
        };
    } catch (error) {
        return {
            status: 500,
            body: {error: 'Ошибка при создании пользователя' + error},
        };
    }
});