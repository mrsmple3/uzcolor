import {prisma} from "~/server/db";

export default defineEventHandler((event) => {
    return prisma.category.findMany();
});