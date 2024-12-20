import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    const {categoryId} = event.context.params;

    const products = await prisma.defineProduct.findMany({
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
        where: {
            categoryId: categoryId
        }
    });

    return products;
});