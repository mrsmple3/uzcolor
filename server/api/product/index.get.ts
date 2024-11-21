import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const products = await prisma.defineProduct.findMany({
        select: {
            id: true,
            name: true,
            art: true,
            weight: true,
            photo: true,
            type: true,
            composition: true,
            params: true,
            color: true,
            categoryId: true,
        }
    });

    return products;
});