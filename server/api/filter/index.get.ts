import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const filter = await prisma.filter.findMany()

    return filter
})