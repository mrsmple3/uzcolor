import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler((event) => {
    const {type_name} = event.context.params;

    return prisma.defineProduct.findMany({
        select: {
            id: true,
            name: true,
            art: true,
            weight: true,
            type: true,
            composition: true,
            color: true,
            categoryId: true,
        },
        where: {
            type: type_name
        }
    });
});