import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

function filterChecked(filters) {
    return filters.some(filter => filter.checked);
}

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const {filters, products} = body;

        let filteredProducts = products;

        filters.forEach(filter => {
            if (filterChecked(filter.filters)) {
                filteredProducts = filteredProducts.filter(product => {
                    const productParam = product.params.find(param => param.title === filter.name);
                    if (!productParam) return false;

                    return filter.filters.some(filterItem => {
                        return filterItem.checked && productParam.param.name === filterItem.name;
                    });
                });
            }
        });

        return filteredProducts;
    } catch (error) {
        console.error('Error filtering products:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});