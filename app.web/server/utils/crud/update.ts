import { defineEventHandler, getQuery, H3Event } from 'h3';
import { BaseEntity } from '~~/shared/base/BaseEntity';
import { Paginated, PaginationOptions, SortDirection } from '~~/shared/base/paginated';

export default function<T extends BaseEntity>(repo: any) {
    return defineEventHandler(async (event: H3Event) => {
        const id = getRouterParam(event, 'id');
        const body = await readBody<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>(event);

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing id parameter.',
            });
        }

        return await repo.update({
            where: { id },
            data: body,
        });
    });
};