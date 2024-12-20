import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const products = await prisma.defineProduct.findMany({
        skip: skip,
        take: limit,
        select: {
            id: true,
            name: true,
            art: true,
            weight: true,
            type: true,
            composition: true,
            params: true,
            color: true,
            categoryId: true,
        },
    });

    return products;
});