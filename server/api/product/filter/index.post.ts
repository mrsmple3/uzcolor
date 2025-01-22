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
                    const productParam = product.params.find(param => param.filter.name === filter.name);
                    if (!productParam) return false;

                    return filter.filters.some(filterItem => {
                        return filterItem.checked && productParam.param.filter.name === filterItem.name;
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