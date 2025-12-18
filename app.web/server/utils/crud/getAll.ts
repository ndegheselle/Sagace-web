import { defineEventHandler, getQuery, H3Event } from 'h3';
import { BaseEntity } from '~~/shared/base/BaseEntity';
import { Paginated, PaginationOptions, SortDirection } from '~~/shared/base/paginated';

export default function<T extends BaseEntity>(repo: any) {
    return defineEventHandler(async (event: H3Event) => {
        const query = getQuery(event);
        const options = new PaginationOptions(
            Number(query.page ?? 1),
            Number(query.limit ?? 10),
            query.orderBy as string,
            query.orderDirection as SortDirection);

        const skip = (options.page - 1) * options.limit;
        const [data, total] = await Promise.all([
            repo.findMany({
                skip,
                take: options.limit,
                orderBy: {
                    [options.orderBy ?? 'createdAt']: options.orderDirection == SortDirection.ASC ? 'asc' : 'desc',
                },
            }),
            repo.count(),
        ]);

        return new Paginated<T>(data, total, options);
    });
};