import { defineEventHandler, getQuery, H3Event } from 'h3';
import { BaseEntity } from '~~/shared/base/BaseEntity';
import { Paginated, PaginationOptions, SortDirection } from '~~/shared/base/paginated';

export default function<T extends BaseEntity>(repo: any) {
    return defineEventHandler(async (event: H3Event) => {
        const id = getRouterParam(event, 'id');
        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing id parameter.',
            });
        }
        return await repo.findUnique({
            where: { id },
        });
    });
};