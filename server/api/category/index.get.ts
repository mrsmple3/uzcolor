import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    return await prisma.category.findMany();
});