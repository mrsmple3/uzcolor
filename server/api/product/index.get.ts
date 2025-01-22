// server/api/product/index.get.ts
import {prisma} from "~/server/db";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = query.search as string;


    const products = search
        ? await prisma.$queryRaw`
        SELECT
            p.id,
            p.name,
            p.art,
            p.weight,
            p.price,
            p.type,
            p.composition,
            p.color,
            p."category_id" as "categoryId",
            p.show,
            json_agg(json_build_object(
                'name', param.name,
                'filter', (
                    SELECT json_agg(json_build_object(
                        'id', f.id,
                        'name', f.name,
                        'show', f.show
                    ))
                    FROM "filters" f
                    WHERE f.id = param."filterId"
                )
            )) as params
        FROM "define_products" p
        LEFT JOIN "filter_products" param ON param."defineProductId" = p.id
        WHERE SIMILARITY(CONVERT(UNACCENT(regexp_replace(lower(p.name), '[.,''׳\`"-]', '', 'g'))::bytea,'UTF8','Unicode')::text,
        CONVERT(UNACCENT(regexp_replace(lower(${search}), '[.,''׳\`"-]', '', 'g'))::bytea,'UTF8','Unicode')::text) > 0.3
        GROUP BY p.id
        ORDER BY SIMILARITY(convert(UNACCENT(regexp_replace(lower(p.name), '[.,''׳\`"-]', '', 'g'))::bytea,'UTF8','Unicode')::text,
        convert(UNACCENT(regexp_replace(lower(${search}), '[.,''׳\`"-]', '', 'g'))::bytea,'UTF8','Unicode')::text) DESC`
        : await prisma.defineProduct.findMany({
            skip: skip,
            take: limit,
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
                                show: true
                            },
                        },
                    },
                },
                color: true,
                categoryId: true,
                show: true,
            },
        });

    return products || [];
});