import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    const filter = await prisma.filter.findMany()

    return filter
});