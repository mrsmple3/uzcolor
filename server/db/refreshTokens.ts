import {prisma} from "~/server/db/index";

export const createRefreshToken = (data) => {
    return prisma.refreshToken.create({
        data: {
            token: data.token,
            userId: data.userId
        }
    })
}

export const getRefreshTokenByToken = (token) => {
    return prisma.refreshToken.findUnique({
        where: {
            token
        }
    })
}

export const removeRefreshToken = (token) => {
    return prisma.refreshToken.delete({
        where: {
            token
        }
    })
}