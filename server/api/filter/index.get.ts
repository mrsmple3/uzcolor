import {prisma} from "~/server/db";

export default defineEventHandler((event) => {
    return prisma.filter.findMany()
});