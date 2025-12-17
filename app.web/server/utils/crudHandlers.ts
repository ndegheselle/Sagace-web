import { defineEventHandler, getQuery, H3Event, readBody } from 'h3';
import { BaseEntity, BaseRepository } from '~~/prisma/repos/BaseRepository';

/* LIST */
export function createGetAllHandler<T extends BaseEntity>(repo: BaseRepository<T>) {
    return defineEventHandler(async (event: H3Event) => {
        const query = getQuery(event)

        return repo.getAll({
            page: Number(query.page ?? 1),
            limit: Number(query.limit ?? 10),
            orderBy: (query.orderBy as string) ?? 'createdAt',
            orderDirection: query.orderDirection as any,
        })
    })
}

/* GET BY ID */
export function createGetHandler<T extends BaseEntity>(repo: BaseRepository<T>) {
    return defineEventHandler(async (event: H3Event) => {
        const id = getRouterParam(event, 'id');

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing id parameter.',
            });
        }
        return repo.getById(id);
    })
}

/* CREATE */
export function createCreateHandler<T extends BaseEntity>(repo: BaseRepository<T>) {
    return defineEventHandler(async (event: H3Event) => {
        const body = await readBody(event);
        return repo.create(body);
    });
}

/* UPDATE */
export function createUpdateHandler<T extends BaseEntity>(repo: BaseRepository<T>) {
    return defineEventHandler(async (event: H3Event) => {
        const id = getRouterParam(event, 'id');
        const body = await readBody(event);

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing id parameter.',
            });
        }

        return repo.update(id, body);
    });
}

/* DELETE */
export function createDeleteHandler<T extends BaseEntity>(repo: BaseRepository<T>) {
    return defineEventHandler(async (event: H3Event) => {
        const id = getRouterParam(event, 'id');

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing id parameter.',
            });
        }
        return repo.delete(id);
    });
};