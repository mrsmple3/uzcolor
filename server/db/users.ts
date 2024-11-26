import {prisma} from "~/server/db/index";
import bcrypt from 'bcrypt';

export const createUser = (userData) => {
    const finalUserData = {...userData, password: bcrypt.hashSync(userData.password, 10)}

    return prisma.user.create({
        data: finalUserData,
    })
}

export const getUserByUsername = (email: string) => {
    return prisma.user.findUnique({
        where: {email}
    })
}

export const getUserById = (id: string) => {
    return prisma.user.findUnique({
        where: {id}
    })
}