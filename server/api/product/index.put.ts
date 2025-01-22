import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Ensure all required fields are provided
        if (!body.id) {
            return {message: "Missing required field: id"};
        }

        // Check if the category exists
        const category = await prisma.category.findUnique({
            where: {id: body.categoryId},
        });

        if (!category) {
            return {message: "Category not found"};
        }

        // Create or find filters based on product parameters
        const filterProducts = [];
        for (const param of body.params) {
            const filter = await prisma.filter.upsert({
                where: {name: param.filter.name},
                update: {},
                create: {name: param.filter.name},
            });

            const filterProduct = await prisma.filterProduct.upsert({
                where: {
                    FilterProductId: {
                        filterId: filter.id,
                        defineProductId: body.id,
                    },
                },
                update: {name: param.name},
                create: {
                    name: param.name,
                    filterId: filter.id,
                    defineProductId: body.id,
                },
            });

            filterProducts.push({id: filterProduct.id});
        }

        console.log("filterProducts ", filterProducts);

        // Update the product
        const product = await prisma.defineProduct.update({
            select: {
                id: true,
                name: true,
                art: true,
                weight: true,
                price: true,
                type: true,
                composition: true,
                params: {
                    select: {
                        name: true,
                        filter: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                color: true,
                shortDescription: true,
                description: true,
                count: true,
                categoryId: true,
                show: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
            where: {id: body.id},
            data: {
                name: body.name,
                art: body.art,
                weight: body.weight,
                color: body.color,
                price: body.price,
                type: body.type,
                composition: body.composition,
                params: {connect: filterProducts},
                shortDescription: body.shortDescription,
                description: body.description,
                count: body.count,
                show: body.show,
                categoryId: body.categoryId,
            },
        });

        return {
            message: "Product updated successfully",
            product,
        };
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
});